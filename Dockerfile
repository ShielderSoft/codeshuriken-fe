# Use Node.js 18 Alpine as base image for smaller size
FROM node:18-alpine

# Install additional dependencies needed for native modules
RUN apk add --no-cache python3 make g++ libc6-compat

# Set working directory inside container
WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force
RUN rm -rf node_modules package-lock.json || true
RUN npm install

# Copy source code
COPY . .

# Build the application for production
RUN npm run build

# Install a simple HTTP server to serve the built app
# Using serve package which is lightweight and perfect for serving static files
RUN npm install -g serve

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S reactjs -u 1001

# Change ownership of the app directory to the reactjs user
RUN chown -R reactjs:nodejs /app
USER reactjs

# Expose port 3000 (serve default port)
EXPOSE 3000

# Health check to ensure the container is running properly
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Start the application using serve
# -s flag serves Single Page Applications (SPAs) properly by serving index.html for all routes
# -l flag specifies the port to listen on
CMD ["serve", "-s", "dist", "-l", "3000"]
