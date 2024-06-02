# Stage 1: Node.js based build stage
FROM node:latest as build-stage
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY Frontend/package*.json ./

# Install project dependencies
RUN npm ci --force

# Copy the project files into the Docker image
COPY . .

WORKDIR /app/Frontend

# Build the application
RUN npm run build

# Stage 2: Setup the Nginx server
FROM nginx as final-stage

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY Frontend/fe.conf /etc/nginx/conf.d/

# Remove the default Nginx index.html file
RUN rm /usr/share/nginx/html/index.html

# Copy the built app to Nginx server
COPY --from=build-stage /app/Frontend/dist /usr/share/nginx/html/chatappfe

# Expose port 80 to the outside
EXPOSE 80

# Set the default command for the image
CMD ["nginx", "-g", "daemon off;"]
