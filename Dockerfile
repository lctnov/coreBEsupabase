# ================================
# 1️⃣ Build Stage
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build production
RUN npm run build


# ================================
# 2️⃣ Production Stage
# ================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only needed files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Nếu bạn dùng .env.production
# COPY --from=builder /app/.env.production ./

EXPOSE 1211

CMD ["npx", "next", "start", "-p", "1211"]