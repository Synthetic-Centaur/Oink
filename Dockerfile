# Pull node
FROM node:4.2.1-onbuild

# expose port 3000
EXPOSE 3000

# Install dependencies from package.json
# RUN npm install

# Copy ./server/env/envConfig-temp.js and make ./server/env/envConfig.js
RUN npm run copyEnv

# Build build bundle.min.js
RUN npm run build

# Run server
CMD ["npm", "start"]
