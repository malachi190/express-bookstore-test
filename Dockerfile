FROM node:18-alpine

WORKDIR /usr/src/app

# 1. install deps (cached layer)
COPY package*.json ./
RUN npm ci

# 2. copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# 3. copy source **before** compiling
COPY . .

# 4. compile
RUN npx tsc             

# 5. run
EXPOSE 3000
CMD ["node", "dist/index.js"]