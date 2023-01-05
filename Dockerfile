FROM node:16-slim

ENV NODE_ENV=production
ENV HUSKY_SKIP_INSTALL=1

WORKDIR /src/app

COPY ./dist ./dist
COPY ./.next ./.next
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci --omit=dev --ignore-scripts

ENTRYPOINT [ "node" ]
CMD [ "./dist/server/main.js" ]