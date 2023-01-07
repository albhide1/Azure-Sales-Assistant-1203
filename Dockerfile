# base image
FROM node:16.16.0-alpine

# Create and change to the app directory.
WORKDIR /usr/app

# Copy application dependency manifests to the container image.
COPY . .

# Install production dependencies.
RUN yarn install --immutable --immutable-cache --check-cache --production

# Build your project.
RUN yarn build

# Run the web service on container startup.
CMD [ "yarn", "start" ]