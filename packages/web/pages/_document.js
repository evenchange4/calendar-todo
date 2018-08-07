// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import { type Context } from '../utils/type.flow';
import { type PageContext } from '../utils/material-helper';

type InnerProps = {
  styleTags: string,
  pageContext: PageContext,
};

const NextDocument: Class<React.Component<InnerProps>> = Document;

export default class MyDocument extends NextDocument {
  static async getInitialProps({ renderPage }: Context) {
    // Render app and page and get the context of the page with collected side effects.
    let pageContext: PageContext;
    const page = renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext; /* eslint-disable-line */
        return <Component {...props} />;
      };

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired /* eslint-disable-line */,
      };

      return WrappedComponent;
    });
    return {
      ...page,
      pageContext,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry
                .toString()
                .replace(/[\s\n]/g, ''),
            }}
          />
          {flush() || null}
        </React.Fragment>
      ),
    };
  }

  props: InnerProps;

  render() {
    const { styleTags, pageContext } = this.props;
    return (
      <html lang="en">
        <Head>
          <title>Calendar-todo</title>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              'user-scalable=0, initial-scale=1, ' +
              'minimum-scale=1, width=device-width, height=device-height'
            }
          />
          <meta
            name="theme-color"
            content={pageContext.theme.palette.primary.main}
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
