// @flow
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withSourceMaps = require('@zeit/next-source-maps');

const { BUNDLE_ANALYZE } = process.env;

module.exports = withSourceMaps(
  withBundleAnalyzer({
    analyzeServer: ['server', 'both'].includes(BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: './../analyze/server.html',
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: './analyze/client.html',
      },
    },
  }),
);
