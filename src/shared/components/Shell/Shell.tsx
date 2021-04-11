import React from 'react';
import ShellHeader from './ShellHeader';
import ShellSideBar from './ShellSideBar';
import ShellMain from './ShellMain';
import { Box } from '@material-ui/core';

const Shell: React.FunctionComponent = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex">
      <ShellHeader onOpenDrawer={handleDrawerOpen} open={open} />
      <ShellSideBar onCloseDrawer={handleDrawerClose} open={open}/>
      <ShellMain>{props.children}</ShellMain>
    </Box>
  );
};

export default Shell;
