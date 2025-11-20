# Quick Reference - Dual Environment Setup

## 📋 Environment Files

| File | Purpose | Database |
|------|---------|----------|
| `.env.local` | Development (auto-loaded) | PostgreSQL Local |
| `.env.docker` | Docker Compose dev | PostgreSQL in Docker |
| `.env` | Production | Supabase (update with your creds) |
| `.env.example` | Template (Git tracked) | Template only |

## 🚀 Quick Commands

### Local Development
```bash
npm run dev                # Start dev server with local PostgreSQL
npm run migrate:dev        # Migrate local database
npm run seed              # Seed test users
npm run type-check        # Check TypeScript errors
```

### Docker Development
```bash
docker-compose up --build  # Build and run containers
npm run migrate:docker     # Run migrations inside container
npm run seed              # Seed database (from host)
```

### Production
```bash
npm run build             # Build Next.js app
npm run migrate:prod      # Migrate Supabase database
npm start                # Run production server
```

## 🔄 How It Works

**Local Dev** (npm run dev)
```
.env.local loaded
↓
DATABASE_URL = localhost:5432
↓
Drizzle connects to local PostgreSQL
```

**Production** (npm run build && npm start)
```
.env loaded
↓
DATABASE_URL = Supabase PostgreSQL
↓
Drizzle connects to Supabase
```

**Docker** (docker-compose up)
```
.env.docker loaded
↓
DATABASE_URL = db:5432 (container name)
↓
Drizzle connects to PostgreSQL container
```

## ✅ Verify Setup

```bash
# 1. Check local dev env
ls -la .env.local

# 2. Check Docker env
ls -la .env.docker

# 3. Check prod env
ls -la .env

# 4. Test local connection
npm run seed

# 5. Check available scripts
npm run | grep migrate
```

## ⚙️ Update Supabase Credentials

Edit `.env` and replace:
```
DATABASE_URL="<DATABASE_URL_PROD>"
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_YOUR_KEY"
```

## 📚 Documentation Files

- **`ENV_SETUP.md`** - Detailed dual-environment guide
- **`DUAL_ENV_SETUP.md`** - Setup summary and next steps
- **`CLEANUP_REPORT.md`** - Removed unused files
- **`ARCHITECTURE.md`** - Project architecture

All files are **Git tracked** and safe to browse!
