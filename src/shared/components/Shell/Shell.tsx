import React from 'react';
import ShellHeader from './ShellHeader';
import ShellSideBar from './ShellSideBar';
import ShellMain from './ShellMain';
import { useShellStyles } from './useShellStyle';

const Shell: React.FunctionComponent = (props) => {
  const classes = useShellStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ShellHeader onOpenDrawer={handleDrawerOpen} open={open} />
      <ShellSideBar onCloseDrawer={handleDrawerClose} open={open}/>
      <ShellMain>{props.children}</ShellMain>
    </div>
  );
};

export default Shell;
