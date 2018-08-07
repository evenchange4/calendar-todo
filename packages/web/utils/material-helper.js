/* eslint no-underscore-dangle: 0 */
// @flow

import { SheetsRegistry } from 'jss';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import checkServer from './checkServer';

export type PageContext = {
  theme: Object,
  sheetsManager: Map<any, any>,
  sheetsRegistry: any,
  generateClassName: any,
};

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
  },
});

function createPageContext(): PageContext {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (checkServer()) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
