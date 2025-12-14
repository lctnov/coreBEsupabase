# CoreBE Supabase - Next.js + tRPC + Drizzle + PostgreSQL

Kiến trúc hoàn chỉnh với hệ thống **Đăng nhập/Đăng ký** và **Session timeout 1 giờ**

## 🏗️ Kiến trúc Dự án

```
src/
├── pages/
│   ├── api/
│   │   └── trpc/[trpc].ts          # tRPC API endpoint
│   ├── auth/
│   │   ├── login.tsx               # Trang đăng nhập
│   │   └── register.tsx            # Trang đăng ký
│   ├── dashboard/
│   │   └── index.tsx               # Dashboard (protected)
│   ├── _app.tsx                    # App wrapper + tRPC provider
│   ├── _document.tsx               # Next.js document
│   └── index.tsx                   # Home page (redirect)
├── server/
│   ├── db/
│   │   ├── index.ts                # Database connection (Drizzle)
│   │   └── schema.ts               # DB schema (users + sessions)
│   ├── routers/
│   │   ├── index.ts                # Router aggregator
│   │   ├── auth.ts                 # Auth endpoints (login, register, logout, me)
│   │   └── user.ts                 # User endpoints
│   ├── trpc/
│   │   ├── router.ts               # tRPC router + protected procedure
│   │   └── context.ts              # tRPC context (user auth checking)
│   └── utils/
│       └── session.ts              # Session management utilities
├── styles/
│   └── globals.css                 # Global styles + Tailwind
└── utils/
    └── trpc.ts                     # Client tRPC setup
```

## 🔐 Tính năng Xác thực

### 1. **Đăng ký (Register)**
- Email validation
- Password hashing (bcryptjs)
- Duplicate email checking

### 2. **Đăng nhập (Login)**
- Email + password validation
- Tạo session mới (token + expires_at)
- Xóa session cũ tự động
- Return token cho client

### 3. **Session Management**
- Session timeout: **1 giờ**
- Token-based authentication
- Auto-logout khi session expires
- Real-time countdown timer on dashboard

### 4. **Protected Routes**
- `/dashboard` - Chỉ accessible khi đã login
- Protected procedures dùng `protectedProcedure`

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

### Sessions Table
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

## 🚀 Getting Started

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Tạo file `.env.local`:
```env
DATABASE_URL=<DATABASE_URL_DOCKER>
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NODE_ENV=production
```

### 3. Run Migrations
```bash
npm run migrate:generate  # Generate migration
npm run migrate           # Push to database
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Run with Docker
```bash
docker-compose up -d --build
```

## 📝 API Endpoints

### Auth Router (`/api/trpc`)

**Register**
```typescript
POST /api/trpc
Body: { 
  "0": "auth.register", 
  "1": { "email": "user@example.com", "password": "123456" }
}
```

**Login**
```typescript
POST /api/trpc
Body: {
  "0": "auth.login",
  "1": { "email": "user@example.com", "password": "123456" }
}
// Returns: { token, expiresAt, user }
```

**Logout**
```typescript
POST /api/trpc
Headers: { Authorization: "Bearer <token>" }
Body: { "0": "auth.logout", "1": { "token": "<token>" } }
```

**Check Session**
```typescript
GET /api/trpc
Query: { "0": "auth.checkSession" }
// Returns: { isAuthenticated, user, sessionExpired }
```

**Get Current User**
```typescript
GET /api/trpc
Headers: { Authorization: "Bearer <token>" }
Query: { "0": "auth.me" }
// Returns: { user }
```

## 🔄 Session Flow

```
1. User Registers → Email/Password → Create User (bcryptjs hash)
2. User Logins → Email/Password → Create Session (token + expires_at)
3. Client stores token in cookie (sessionToken)
4. Each request → Context checks token → Validates expiry
5. Session expires after 1 hour → Auto-logout
6. User clicks Logout → Delete session from DB
```

## 🛡️ Security Features

- ✅ Password hashing (bcryptjs)
- ✅ Session-based authentication
- ✅ Token validation on each request
- ✅ Automatic session cleanup
- ✅ Protected procedures (tRPC middleware)
- ✅ Secure cookies (httpOnly, path, max-age)

## 📱 Frontend Usage

### Login Flow
```typescript
const loginMutation = trpc.auth.login.useMutation({
  onSuccess: (data) => {
    document.cookie = `sessionToken=${data.token}; path=/; max-age=${60 * 60}`;
    router.push("/dashboard");
  },
});

await loginMutation.mutateAsync({ email, password });
```

### Protected Page
```typescript
const checkSessionQuery = trpc.auth.checkSession.useQuery();

useEffect(() => {
  if (!checkSessionQuery.data?.isAuthenticated) {
    router.push("/auth/loginView");
  }
}, [checkSessionQuery.isSuccess]);
```

### Real-time Session Timer
```typescript
const [sessionTimeLeft, setSessionTimeLeft] = useState("");

useEffect(() => {
  const interval = setInterval(() => {
    const expiresAt = localStorage.getItem("sessionExpiresAt");
    const remaining = new Date(expiresAt).getTime() - Date.now();
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    setSessionTimeLeft(`${minutes}:${seconds.padStart(2, "0")}`);
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

## 🧪 Testing

### Test Register
1. Go to `http://localhost:3000/features/register`
2. Enter email + password
3. Click "Đăng ký"

### Test Login
1. Go to `http://localhost:3000/features/login`
2. Enter registered email + password
3. Click "Đăng nhập"
4. Redirected to dashboard

### Test Session Timeout
1. Login to dashboard
2. Watch the session timer
3. Wait until it expires (1 hour)
4. Auto-redirect to login page

### Test Logout
1. Click "Logout" button
2. Session deleted from DB
3. Redirected to login page

## 📦 Dependencies

### Runtime
- `next` - React framework
- `@trpc/server` - Backend tRPC
- `@trpc/next` - tRPC Next.js adapter
- `@trpc/react-query` - Frontend tRPC + React Query
- `drizzle-orm` - SQL ORM
- `pg` - PostgreSQL client
- `bcryptjs` - Password hashing
- `zod` - Schema validation

### DevDependencies
- `typescript` - TypeScript
- `drizzle-kit` - Drizzle CLI
- `tailwindcss` - CSS framework
- `postcss` - CSS processor
- `autoprefixer` - PostCSS plugin

## 🔧 Configuration Files

- `tsconfig.json` - TypeScript config
- `next.config.js` - Next.js config
- `drizzle.config.ts` - Drizzle config
- `tailwind.config.js` - Tailwind config
- `postcss.config.js` - PostCSS config
- `docker-compose.yml` - Docker services
- `Dockerfile` - Docker build config

## 📚 Resources

- [Next.js Docs](https://nextjs.org)
- [tRPC Docs](https://trpc.io)
- [Drizzle Docs](https://orm.drizzle.team)
- [Tailwind Docs](https://tailwindcss.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs)

## 📝 License

ISC

---

**Developed by**: lctnov  
**Repository**: https://github.com/lctnov/coreBEsupabase
