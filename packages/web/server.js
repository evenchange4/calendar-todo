/* eslint import/first: 0 */
// @flow

const path = require('path');

require('dotenv-safe').load({
  allowEmptyValues: true,
  sample: path.join(__dirname, '.env.example'),
});

const express = require('express');
const next = require('next');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const log = require('./utils/log');
const routes = require('./routes');
const nextConfig = require('./next.config');

const { PORT, NODE_ENV, API_DOMAIN, DEBUG } /* : any */ = process.env;

/**
 * Start a server 100% programmatically in order to customize routes.
 * This file is the server side entry.
 * ref: https://github.com/Sly777/ran/blob/master/server.js
 */
const port = parseInt(PORT, 10);
const isDev = NODE_ENV !== 'production';
const app = next({ dev: isDev, dir: __dirname, conf: nextConfig });
const routerHandler = routes.getRequestHandler(app);

const dotenvHandler = (
  req /* : any */,
  res /* : any */,
  nextMiddleware /* : any */,
) /* : void */ => {
  /**
   * IMPORTANT:
   * The dotenv object will be exposed to public client side.
   */
  req.dotenv = { PORT, NODE_ENV, API_DOMAIN, DEBUG };
  nextMiddleware();
};

app.prepare().then(() => {
  const server /* : any */ = express();
  server.use(compression({ threshold: 0 }));
  server.use(helmet());
  server.use(morgan('combined'));
  // Note: For HEALTHCHECK
  server.get('/health', (req, res) => res.send('200 OK'));
  server.use(dotenvHandler);
  server.use(routerHandler);

  server.listen({ port }, err => {
    if (err) throw err;
    log(`> Ready on http://localhost:${port}`);
  });
});
