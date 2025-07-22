# Uses node 22 as base image
FROM node:22

# Set workdir to /app
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of files, make sure to have a .dockerignore for things like node_modules
COPY . .

# Set WS_URL env variable
ENV VITE_WS_URL=ws://192.168.68.102:8080

# Expose required ports
EXPOSE 5173
EXPOSE 8080

# Run the app
CMD ["npm", "run", "dev"]