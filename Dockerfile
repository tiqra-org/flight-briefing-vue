# build stage
FROM node:14.18.1-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts

COPY Dockerfile ./
COPY index.html ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./
COPY ./src/ ./src/
COPY ./public/ ./public/

RUN npm run build

# production stage
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]