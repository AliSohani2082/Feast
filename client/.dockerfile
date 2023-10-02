# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN bunx install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN bun run build

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app
CMD ["bun", "start"]
