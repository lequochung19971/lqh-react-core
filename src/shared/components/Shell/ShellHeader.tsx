import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar, Typography } from '@mui/material';
import { AppBar } from './style';

type Props = {
  onOpenDrawer: () => void;
  open: boolean;
};

const ShellHeader: React.FunctionComponent<Props> = (props) => {
  const { onOpenDrawer, open } = props;

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar sx={{ padding: '0!important' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onOpenDrawer}
          edge="start"
          hidden={open}
          sx={(theme) => ({ marginLeft: theme.spacing(3), marginRight: theme.spacing(3) })}
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
