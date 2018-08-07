// @flow
import * as React from 'react';
import { pure, compose } from 'recompose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit">
        Calendar Todo Application
      </Typography>
    </Toolbar>
  </AppBar>
);

export default compose(pure)(Header);
