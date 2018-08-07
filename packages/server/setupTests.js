// @flow

require('dotenv-safe').load({ path: '.env.test' });

jest.mock('./src/utils/getOauthClient', () => () => ({}));
