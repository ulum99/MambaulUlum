# Use the official Node.js image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY /app/package.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port and start the application
EXPOSE 5000
CMD ["node", "app.js"]
