FROM node:16-slim

ENV NODE_ENV=production
ENV HUSKY_SKIP_INSTALL=1

WORKDIR /src/app

COPY ./dist ./dist
COPY ./.next ./.next
COPY ./package.json ./package.json
COPY ./node_modules ./node_modules
COPY ./package-lock.json ./package-lock.json

RUN arch=$(arch | sed s/aarch64/arm64/ | sed s/x86_64/amd64/)
RUN npm rebuild --arch=${arch}

ENTRYPOINT [ "node" ]
CMD [ "./dist/server/main.js" ]