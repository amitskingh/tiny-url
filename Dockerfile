# Use the official Node.js 22.12.0 (LTS) image from Docker Hub
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package.json
COPY package-lock.json package-lock.json

# Install the dependencies
RUN npm install

# Copy the rest of your application files into the container
COPY . .

# Expose the port your app will run on (example: 3000)
EXPOSE 3000

# Run the application using nodemon for auto-reloading
CMD ["npx", "nodemon", "app.js"]
