/* eslint import/first: 0 */
// @flow

import './utils/dotenv';
import server from './server';

const { PORT }: any = process.env;

server(PORT);
