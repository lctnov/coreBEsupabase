# Dual Environment Setup - Development & Production

This project supports two database environments:
- **Development**: PostgreSQL Local (localhost)
- **Production**: Supabase PostgreSQL (cloud)

## Environment Files

### `.env.local` (Development - Git Ignored)
Used when running `npm run dev` locally with PostgreSQL on localhost.

```env
NODE_ENV="development"
DATABASE_URL="<DATABASE_URL_LOCAL>" # example: postgres connection string (keep real value in .env.local)
```

### `.env` (Production - Git Ignored)
Used when building/deploying to production with Supabase.

```env
NODE_ENV="production"
DATABASE_URL="<DATABASE_URL_PROD>" # set your Supabase connection string in .env
NEXT_PUBLIC_SUPABASE_URL="https://XXXX.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_XXXX"
```

### `.env.docker` (Docker Local - Git Ignored)
Used when running with Docker Compose for containerized local development.

```env
NODE_ENV="development"
DATABASE_URL="<DATABASE_URL_DOCKER>" # example: postgres connection for docker (db container)
```

### `.env.example` (Git Tracked)
Template showing expected variables. Copy to create your `.env.local` or `.env`.

## Quick Start

### 1. Development (Local PostgreSQL)

Ensure PostgreSQL is running locally on `localhost:5432`.

```bash
# Install dependencies
npm install

# Run migrations
npm run migrate:dev

# Seed database with test users
npm run seed

# Start dev server
npm run dev
```

Access: `http://localhost:3000`

### 2. Production Build (Supabase)

Create `.env` with your Supabase credentials:

```bash
# Set up production environment
cp .env.example .env
# Edit .env with Supabase DATABASE_URL and keys

# Build production
npm run build

# Run migrations on Supabase
npm run migrate:prod

# Start production server
npm start
```

### 3. Docker Development (Local PostgreSQL in Container)

```bash
# Build and run containers
docker-compose up --build

# In another terminal, run migrations inside container
npm run migrate:docker

# Seed database (can run from host or inside container)
npm run seed
```

Access: `http://localhost:1312`

## Migration Commands

| Command | Purpose |
|---------|---------|
| `npm run migrate` | Auto-detect env and migrate |
| `npm run migrate:dev` | Migrate local PostgreSQL |
| `npm run migrate:prod` | Migrate Supabase PostgreSQL |
| `npm run migrate:generate` | Generate new migration file |
| `npm run migrate:docker` | Migrate inside Docker container |

## How It Works

1. **Environment Detection**: Next.js and Drizzle automatically detect `NODE_ENV` and pick the right `.env` file
2. **Database Connection**: `src/server/db/index.ts` uses `process.env.DATABASE_URL` from active env
3. **Drizzle Config**: `drizzle.config.ts` respects the active environment's DATABASE_URL
4. **Automatic Fallback**: If `.env.local` exists, it's used for dev; otherwise `.env` is used

## Environment Priority

Next.js loads environment files in this order (highest to lowest priority):

1. `.env.local` (local overrides)
2. `.env.[NODE_ENV]` (NODE_ENV-specific)
3. `.env` (default)

## Security Notes

- ✓ `.env.local` and `.env` are in `.gitignore` - never commit credentials
- ✓ `.env.example` is tracked - shows expected variables
- ✓ `NEXT_PUBLIC_*` variables are safe to expose (client-side)
- ✓ `DATABASE_URL` is server-side only (not exposed to client)

## Database Schema

Same schema is used for both environments:

```
users table:
  - id (UUID)
  - email (VARCHAR, unique)
  - password (TEXT, hashed)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)

sessions table:
  - id (UUID)
  - user_id (UUID, FK → users.id)
  - token (TEXT, unique)
  - expires_at (TIMESTAMP)
  - created_at (TIMESTAMP)
```

## Troubleshooting

### Can't connect to local PostgreSQL
```bash
# Check if PostgreSQL is running
psql -U testlab -d SupTEST -h localhost

# If not running, start it (macOS with Homebrew)
brew services start postgresql@15
```

### Supabase connection fails
- Verify DATABASE_URL in `.env` is correct
- Check Supabase dashboard for connection pool settings
- Use `aws-0-ap-southeast-1.pooler.supabase.com:6543` (pooler) not `db.XXXX.supabase.co:5432`

### Docker database connection issues
- Ensure `suptest_db` container is running: `docker ps | grep suptest_db`
- Check logs: `docker logs suptest_db`
- Use container hostname `db` not `localhost` in .env.docker

## Testing Both Environments

```bash
# Test local dev
npm run dev
# Go to http://localhost:3000

# Test Docker
docker-compose up --build
# Go to http://localhost:1312

# Test production (after building)
npm run build
npm start
# Go to http://localhost:3000
```
