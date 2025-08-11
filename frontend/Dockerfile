# 1. Use Node.js LTS
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build the app
RUN npm run build

# 2. Run in production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built app & deps from builder
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public

# Expose Next.js default port
EXPOSE 3000

CMD ["npm", "start"]
