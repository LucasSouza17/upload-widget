FROM node:22.16.0 AS base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

FROM base AS build

WORKDIR /usr/src/app

COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN pnpm build
RUN pnpm prune --prod

FROM gcr.io/distroless/nodejs22-debian12 AS deploy

USER 1000

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

ENV DATABASE_URL="postgresql://docker:docker@localhost:5432/upload_widget_db"
ENV CLOUDFARE_ACCOUNT_ID="e6105d8832f29d61e9511057b147d132"
ENV CLOUDFARE_ACCESS_KEY_ID="526457b9b299d46bad08105b4c7d72a5"
ENV CLOUDFARE_SECRET_ACCESS_KEY="f6ec72e962f9e93006206f84b7a3bb28f88c94a2de56fbd1c795715374e15cc9"
ENV CLOUDFARE_BUCKET="upload-widget"
ENV CLOUDFARE_PUBLIC_URL="https://pub-524e0582e2d6413d9fa62ce3d3fd19dc.r2.dev"

EXPOSE 3333

CMD ["dist/infra/http/server.js"]