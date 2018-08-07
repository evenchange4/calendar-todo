// @flow
import { type ApolloClient } from 'apollo-client';
import createApolloClient from './createApolloClient';
import checkServer from './checkServer';

let cacheApolloClient = null;

export default function initApollo(initialState: Object = {}): ApolloClient<*> {
  if (checkServer()) {
    return createApolloClient(initialState);
  }
  if (!cacheApolloClient) {
    cacheApolloClient = createApolloClient(initialState);
  }
  return cacheApolloClient;
}
