// @flow
const debug = require('debug');
const { DEBUG } = require('./dotenv');

/**
 * [CJS] This file is shared between client side and server side.
 */

const PREFIX = 'web';

debug.enable(DEBUG);

function log(message /* : string */) /* : void */ {
  const d = debug(PREFIX);

  d(message);
}

module.exports = log;
