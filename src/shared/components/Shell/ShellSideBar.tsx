import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { navigators } from '@shared/configs';
import { useShellStyles } from './useShellStyle';

interface Props {
  open: boolean;
  onCloseDrawer: () => void;
}
const ShellSideBar: React.FunctionComponent<Props> = (props) => {
  const classes = useShellStyles();
  const { open, onCloseDrawer } = props;

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={onCloseDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {navigators.map((nav, index) => (
          <ListItem component={Link} button to={nav.path} key={`${nav.name}-${index}`} alignItems="center">
            <ListItemIcon className={classes.flexCenter}>{nav.icon}</ListItemIcon>
            <ListItemText primary={nav.name} hidden={!open} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default ShellSideBar;
