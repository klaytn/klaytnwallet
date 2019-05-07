FROM node:10 AS build

# Install dependencies with package.json only, so we can cache node_modules
# when code changes.
WORKDIR /build
COPY package.json .
RUN npm install

COPY . .
RUN npm run build:docker

FROM nginx
COPY --from=build /build/dist /usr/share/nginx/html
COPY ./config/docker-nginx.conf /etc/nginx/conf.d/default.conf
