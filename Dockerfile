# Build image
FROM node:13.14 as build

WORKDIR /tmp

# Only copy the package files to take advantage of cached Docker layers.
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy project
COPY . .

# Build project
RUN npm run build

# Release image
FROM node:13.14 as release

WORKDIR /app

# Copy build files into release image
COPY --from=build ./tmp/package.json .
COPY --from=build ./tmp/package-lock.json .
COPY --from=build ./tmp/vicompany-root.pem .
COPY --from=build ./tmp/app ./app
COPY --from=build ./tmp/static ./static

# ENV production settings
ENV NODE_ENV=production

# Install production node modules
RUN npm ci

# Add VI certificate
ENV NODE_EXTRA_CA_CERTS=vicompany-root.pem

# Switch to node user instead of ROOT user
USER node

EXPOSE 5000

# Bypass the package.json's start command:
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#cmd
CMD ["node", "./app"]
