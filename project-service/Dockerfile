# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# If using TypeScript, build it
RUN npm run build

# Expose the service port (adjust if needed)
EXPOSE 5002

# Start the application
CMD ["node", "dist/index.js"]
