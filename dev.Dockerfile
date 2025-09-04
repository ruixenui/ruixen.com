# Development Dockerfile for Ruixen UI
FROM node:18-alpine

# Install dependencies
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Enable pnpm
RUN corepack enable pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Set environment to development
ENV NODE_ENV=development

# Start development server
CMD ["pnpm", "dev"]