FROM node:16-slim

ENV NODE_ENV=production

WORKDIR /src/app

COPY ./dist ./dist
COPY ./.next ./.next
COPY ./node_modules ./node_modules
COPY ./package.json ./package.json

ENTRYPOINT [ "node" ]
CMD [ "./dist/server/main.js" ]