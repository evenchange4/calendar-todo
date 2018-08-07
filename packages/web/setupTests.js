/* eslint import/first: 0, no-underscore-dangle: 0 */
// @flow

require('dotenv-safe').load({ path: '.env.test' });

import Enzyme from '@pisano/enzyme';
import Adapter from '@pisano/enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Note: Mock Next.js dotenv
 * global is window in jest
 */
global.__NEXT_DATA__ = {
  props: {
    dotenv: process.env,
  },
};

const RealDate = Date;

function mockDate(isoDate) {
  global.Date = class extends RealDate {
    constructor(...theArgs) {
      if (theArgs.length) {
        return new RealDate(...theArgs);
      }
      return new RealDate(isoDate);
    }

    static now() {
      return new RealDate(isoDate).getTime();
    }
  };
}

mockDate('2018-08-07T12:34:56z');

jest.mock('date-fns/format/index', () => () => 'mock');
