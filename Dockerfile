FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
ENV VITE_API_KEY="3EF5EABB9C32A866FF4B2AD6A4D6E"
ENV VITE_ENDPOINT="http://localhost:3000/api"
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app


RUN npm run build

FROM node:20-alpine
COPY ./package.json package-lock.json /app/

COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]