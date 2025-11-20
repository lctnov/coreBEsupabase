#!/bin/bash

# Migrate for Development (PostgreSQL Local)
echo "Migrating Development Database (PostgreSQL Local)..."
NODE_ENV=development npx drizzle-kit push
echo "✓ Development migration complete"
