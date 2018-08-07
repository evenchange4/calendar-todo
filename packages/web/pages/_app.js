/* global window, document */
/* eslint no-underscore-dangle: 0, prefer-destructuring: 0 */
// @flow
import App, { Container } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { type ApolloClient } from 'apollo-client';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import fetch from 'isomorphic-unfetch';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext, { type PageContext } from '../utils/material-helper';
import { type Router, type Dotenv, type Context } from '../utils/type.flow';
import initApollo from '../utils/initApollo';
import log from '../utils/log';
import checkServer from '../utils/checkServer';

type PageProps = {
  apolloState: Object,
  dotenv: Dotenv,
};
type InnerProps = {
  Component: React.ComponentType<any>,
  router: Router,
} & PageProps;
type Window = {
  __NEXT_DATA__: {
    props: PageProps,
  },
};

const NextApp: Class<React.Component<*>> = App;

if (checkServer() && !global.fetch) {
  global.fetch = fetch;
}

class MyApp extends NextApp {
  static async getInitialProps({
    Component,
    ctx,
    router,
  }: {
    Component: React.ComponentType<*>,
    ctx: Context,
    router: Router,
  }): Promise<PageProps> {
    const isServer = checkServer();
    let apolloState: Object = {};
    let dotenv: ?Dotenv;

    if (isServer) {
      dotenv = ctx.req.dotenv;
    } else {
      dotenv = (window: Window).__NEXT_DATA__.props.dotenv;
    }

    if (isServer) {
      if (ctx.res && ctx.res.finished) {
        return {
          apolloState,
          dotenv,
        };
      }
      const apollo = initApollo({});
      try {
        await getDataFromTree(
          <ApolloProvider client={apollo}>
            <Component />
          </ApolloProvider>,
          { router },
        );
      } catch (error) {
        log('[getDataFromTree] error: ');
        log(error);
      }
      Head.rewind();
      apolloState = apollo.cache.extract();
    }

    return {
      apolloState,
      dotenv,
    };
  }

  constructor(props: InnerProps) {
    super(props);
    const { apolloState } = props;
    this.apollo = initApollo(apolloState);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  props: InnerProps;

  pageContext: PageContext;

  apollo: ?ApolloClient<*>;

  render() {
    const { Component } = this.props;
    const { apollo, pageContext } = this;

    return (
      <ApolloProvider client={apollo}>
        <Container>
          {/* Wrap every page in Jss and Theme providers */}
          <JssProvider
            registry={pageContext.sheetsRegistry}
            generateClassName={pageContext.generateClassName}
          >
            {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
            <MuiThemeProvider
              theme={pageContext.theme}
              sheetsManager={pageContext.sheetsManager}
            >
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
              <Component pageContext={this.pageContext} />
            </MuiThemeProvider>
          </JssProvider>
        </Container>
      </ApolloProvider>
    );
  }
}

export default MyApp;
