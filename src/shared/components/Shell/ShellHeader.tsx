import clsx from 'clsx';
import React from 'react';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { useShellStyles } from './useShellStyle';

type Props = {
  onOpenDrawer: () => void;
  open: boolean;
};

const ShellHeader: React.FunctionComponent<Props> = (props) => {
  const classes = useShellStyles();

  const { onOpenDrawer, open } = props;

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onOpenDrawer}
          edge="start"
          hidden={open}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          React-Core
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ShellHeader;
