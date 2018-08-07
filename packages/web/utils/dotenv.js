/* global window */
/* eslint no-underscore-dangle: 0 */
// @flow

/**
 * [CJS] This file is shared between client side and server side.
 * ref: https://github.com/zeit/next.js/blob/canary/examples/with-universal-configuration-runtime/lib/env.js
 * Note: The __NEXT_DATA__.props is inject in server.js and setup in _app.js
 */

const dotenv /* : any */ =
  typeof window === 'undefined'
    ? process.env
    : window.__NEXT_DATA__ &&
      window.__NEXT_DATA__.props &&
      window.__NEXT_DATA__.props.dotenv;

module.exports = dotenv;
