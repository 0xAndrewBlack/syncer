## build runner
FROM node:18.7-alpine3.16 as build-runner

# Set temp directory
WORKDIR /tmp/app

# Update and upgrade alpine packages
RUN apk update --no-cache \
  && apk upgrade --no-cache

# Move package.json
COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src

# Install dependencies
RUN npm ci --quiet

# Build project
RUN npm run build

## producation runner
FROM node:18.7-alpine3.16 as prod-runner

# Set work directory
WORKDIR /app

COPY --chown=node:node --from=build-runner /tmp/app/node_modules /app/node_modules

# Copy package.json from build-runner
COPY --chown=node:node --from=build-runner /tmp/app/package.json /app/package.json

# Move build files
COPY --chown=node:node --from=build-runner /tmp/app/dist /app/dist

RUN deluser --remove-home node \
  && addgroup -S node -g 1001 \
  && adduser -S -G node -u 1001 node \
  && chmod u+s /bin/ping \
  && rm -rf /lib/apk \
  && rm -rf /etc/apk \
  && rm -rf /usr/share/apk \
  && rm -rf /sbin/apk \
  && rm -rf /opt/yarn* \
  && find ./ -name "*.md" -type f -delete

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Start bot
CMD [ "node", "dist/index.js"]
