import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import PageLoading from '../PageLoading/PageLoading';
import ShellHeader from './ShellHeader';
import ShellMain from './ShellMain';
import ShellSideBar from './ShellSideBar';

const Shell: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PageLoading />
      <Box display="flex">
        <ShellHeader onOpenDrawer={handleDrawerOpen} open={open} />
        <ShellSideBar onCloseDrawer={handleDrawerClose} open={open} />
        <ShellMain>
          <Outlet />
        </ShellMain>
      </Box>
    </>
  );
};

export default Shell;
