// @flow
import getPort from 'get-port';
import { request } from 'graphql-request';
import fkill from 'fkill';
import server from '../server';
import mockData from '../__mock-data__/events.json';

jest.mock('googleapis', () => ({
  google: {
    calendar: () => ({
      events: {
        list: async () => mockData,
      },
    }),
  },
}));

describe('rest modules', () => {
  let port;

  beforeEach(async () => {
    port = await getPort();
    await server(port);
  });

  afterAll(async () => {
    await fkill(`:${port}`);
  });

  it('query Events', async () => {
    try {
      const results = await request(
        `http://localhost:${port}/graphql`,
        `query events {
          events {
            id
            summary
            location
          }
      }
      `,
      );
      expect(results).toMatchSnapshot();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});
