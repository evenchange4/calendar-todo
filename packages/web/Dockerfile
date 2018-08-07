FROM mhart/alpine-node:10.7.0 AS builder
WORKDIR /app
COPY . .
RUN yarn install --pure-lockfile
ENV NODE_ENV=production
RUN yarn run build
RUN yarn run pkg

FROM alpine:3.8
RUN apk update && \
  apk add --no-cache curl libstdc++ libgcc ca-certificates && \
  rm -rf /var/cache/apk/*
WORKDIR /app
COPY --from=builder /app/pkg .
ENV PORT=4001
ENV NODE_ENV=production
ENV API_DOMAIN=http://localhost:4000/graphql
ENV DEBUG=web
HEALTHCHECK --start-period=5m --interval=30s --timeout=5s \
  CMD curl --fail http://localhost:${PORT}/health || exit 1
CMD ./web
