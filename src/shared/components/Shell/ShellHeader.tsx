import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '@http/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import { AppBar } from './style';

type Props = {
  onOpenDrawer: () => void;
  open: boolean;
};

const ShellHeader: React.FunctionComponent<Props> = (props) => {
  const { onOpenDrawer, open } = props;
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await auth.logout();
      navigate('/login', { replace: true });
    } catch (error) {
      throw error;
    }
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar sx={{ padding: '0!important', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onOpenDrawer}
            edge="start"
            hidden={open}
            sx={(theme) => ({ marginLeft: theme.spacing(1), marginRight: theme.spacing(1) })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            React-Core
          </Typography>
        </Box>
        <IconButton
          onClick={logout}
          aria-label="logout"
          size="large"
          sx={(theme) => ({ marginRight: theme.spacing(1) })}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ShellHeader;
