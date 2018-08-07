FROM mhart/alpine-node:10.7.0 AS builder
WORKDIR /app
COPY . .
RUN yarn install --pure-lockfile
RUN yarn run build
RUN yarn run pkg

FROM alpine:3.8
RUN apk update && \
  apk add --no-cache curl libstdc++ libgcc ca-certificates && \
  rm -rf /var/cache/apk/*
WORKDIR /app
COPY --from=builder /app/pkg .
ENV NODE_ENV=production
ENV DEBUG=server
ENV PORT=4000
HEALTHCHECK --start-period=30s --interval=30s --timeout=5s \
  CMD curl --fail http://localhost:${PORT}/health || exit 1
CMD ./server

