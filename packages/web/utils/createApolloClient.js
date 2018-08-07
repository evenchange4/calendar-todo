// @flow
import {
  ApolloClient,
  type ApolloClient as ApolloClientType,
} from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import createLogLink from 'apollo-link-log';
import { InMemoryCache } from 'apollo-cache-inmemory';
import dotenv from './dotenv';
import log from './log';
import checkServer from './checkServer';
import { type Dotenv } from './type.flow';

const { API_DOMAIN } = (dotenv: Dotenv);
const { NODE_ENV } = process.env;

export default function createApolloClient(
  initialState: Object,
): ApolloClientType<*> {
  const httpLink: Object = new HttpLink({
    uri: API_DOMAIN,
    credentials: 'same-origin',
  });
  const logLink = createLogLink({
    enabled: NODE_ENV !== 'production',
    logger: log,
  });
  return new ApolloClient({
    connectToDevTools: !checkServer(),
    ssrMode: checkServer(), // Disables forceFetch on the server (so queries are only run once)
    link: httpLink,
    cache: new InMemoryCache().restore(initialState),
  });
}
