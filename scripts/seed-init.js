#!/usr/bin/env node
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set. Set DATABASE_URL in your environment before running the seed.');
  process.exit(1);
}
const pool = new Pool({ connectionString: DATABASE_URL });

async function createTables(client) {
  // Create users table (SYS_USER)
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  // Create sessions table
  await client.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token TEXT NOT NULL UNIQUE,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  // Indexes
  await client.query(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
  `);
}

async function seedUsers(client) {
  const seedData = [
    { email: 'admin@example.com', password: 'Admin@123456', name: 'Admin User' },
    { email: 'user@example.com', password: 'User@123456', name: 'Regular User' },
  ];

  const inserted = [];
  for (const d of seedData) {
    const hashed = await bcrypt.hash(d.password, 10);
    const res = await client.query(
      `INSERT INTO users (email, password, created_at, updated_at)
       VALUES ($1, $2, NOW(), NOW())
       ON CONFLICT (email) DO UPDATE SET updated_at = NOW()
       RETURNING id, email, created_at`,
      [d.email, hashed]
    );

    if (res.rows.length) inserted.push({ ...res.rows[0], password: d.password, name: d.name });
  }

  // create sessions
  for (const u of inserted) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await client.query(
      `INSERT INTO sessions (user_id, token, expires_at, created_at) VALUES ($1, $2, $3, NOW()) ON CONFLICT (token) DO NOTHING`,
      [u.id, token, expiresAt]
    );
    console.log(`\nUser: ${u.email}`);
    console.log(`  Name: ${u.name}`);
    console.log(`  Password: ${u.password}`);
    console.log(`  ID: ${u.id}`);
    console.log(`  Session token: ${token}`);
    console.log(`  Expires at: ${expiresAt.toISOString()}`);
  }
}

async function main() {
  const client = await pool.connect();
  try {
    console.log('Connected to DB');
    await createTables(client);
    console.log('Tables ensured.');
    await seedUsers(client);
    console.log('\nSeeding complete.');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
