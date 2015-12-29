# Pull node
FROM node:4.2.1

# Make working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install CLI dependencies
RUN npm install -g grunt-cli

# Copy package.json over to working directory
COPY package.json /usr/src/app/

# Install dependencies from package.json
RUN npm install

# Copy application directory into working directory
COPY . /usr/src/app/

# Copy ./server/env/envConfig-temp.js and make ./server/env/envConfig.js
RUN npm run copyEnv

# Create Docs
RUN npm run docs

# Build main.min.css
RUN npm run mincss

# Build bundle.min.js
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run server
CMD ["npm", "start"]
