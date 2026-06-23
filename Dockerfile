# --- Stage 1: Build & Compile TypeScript ---
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy package management files
COPY package*.json ./

# Install ALL dependencies (including typescript and devDependencies for compiling)
RUN npm ci

# Copy the rest of the application source code (including src/ and tsconfig.json)
COPY . .

# Compile TypeScript to JavaScript (generates the dist/ folder)
RUN npm run build

# Strip devDependencies to keep production clean
RUN npm prune --production


# --- Stage 2: Minimal Production Runtime ---
FROM node:20-alpine
WORKDIR /usr/src/app

# Set production environment flags
ENV NODE_ENV=production
ENV PORT=3000

# Copy only production dependencies from builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Copy ONLY the compiled JavaScript files from the dist directory
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/emails ./emails

# Run as non-root container user for security
USER node

EXPOSE 3000

# Run the compiled code directly with the production env file
CMD [ "node", "dist/index.js" ]
