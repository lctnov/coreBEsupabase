#!/bin/bash

# Migrate for Production (Supabase)
echo "Migrating Production Database (Supabase)..."
NODE_ENV=production npx drizzle-kit push
echo "✓ Production migration complete"
