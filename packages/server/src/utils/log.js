// @flow
import debug from 'debug';

const PREFIX = 'server';

const { DEBUG }: any = process.env;
debug.enable(DEBUG);

export default function log(message: string | Object): void {
  const d = debug(PREFIX);

  d(message);
}
