/* eslint import/first: 0 */
// @flow

import './utils/dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { google } from 'googleapis';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import typeDefs from './modules/typeDefs';
import resolvers from './modules/resolvers';
import log from './utils/log';
import getOauthClient from './utils/getOauthClient';

const server = async (port: string) => {
  const auth = await getOauthClient();
  const calendar = google.calendar({ version: 'v3', auth });
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: { calendar },
  });
  const app = express();
  app.use(compression({ threshold: 0 }));
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(cors());
  (app: any).get('/health', (req, res) => res.send('200 OK')); // Note: For HEALTHCHECK

  apolloServer.applyMiddleware({ app });

  app.listen({ port }, () =>
    log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
  );
};

export default server;
