# -----------------------
# 1. Build Stage
# -----------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


# -----------------------
# 2. Production Stage
# -----------------------
FROM node:20-alpine

WORKDIR /app

# copy only needed files from builder
COPY --from=builder /app .

EXPOSE 4000

CMD ["npm", "start"]