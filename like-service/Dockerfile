# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json + lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build if using TypeScript
RUN npm run build

# Expose port
EXPOSE 5003

# Start the app
CMD ["node", "dist/index.js"]
