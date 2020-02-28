import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { func } from 'prop-types';
import DraweSide from '../Drawer';

import './header.scss';

const Header = () => (
  <AppBar className="table-header">
    <Toolbar>
      <DraweSide handleUserQuery={this.props.handleUserQuery} />
      <Typography variant="h6">Space table</Typography>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  handleUserQuery: func,
};

export default Header;
