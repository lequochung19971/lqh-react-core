import React, { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { navigators } from '@shared/configs';
import { NavigatorConfig } from '@shared/types';
import { Drawer, Header } from './style';

const NavItem: React.FunctionComponent<NavigatorConfig> = (props) => {
  const { name, path, icon } = props;
  return (
    <ListItem component={Link} button to={path} key={`${name}`} alignItems="center">
      <ListItemIcon
        sx={(theme) => ({ display: 'flex', justifyContent: 'center', minWidth: theme.spacing(3), marginRight: 2 })}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};

const NavItemMulti: React.FunctionComponent<NavigatorConfig> = (props) => {
  const [open, setOpen] = useState(false);
  const { name, icon, children = [] } = props;

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <ListItemButton alignItems="center" onClick={handleOpen}>
        <ListItemIcon
          sx={(theme) => ({ display: 'flex', justifyContent: 'center', minWidth: theme.spacing(3), marginRight: 2 })}
        >
          <span>{icon}</span>
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children?.map((navChild, index) => {
            return <NavItem key={navChild.path + index} {...navChild} />;
          })}
        </List>
      </Collapse>
    </>
  );
};
interface Props {
  open: boolean;
  onCloseDrawer: () => void;
}

const ShellSideBar: React.FunctionComponent<Props> = (props) => {
  const { open, onCloseDrawer } = props;

  return (
    <Drawer variant="permanent" open={open}>
      <Header>
        <IconButton onClick={onCloseDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Header>
      <Divider />
      <List>
        {navigators.map((nav, index) => (
          <Fragment key={index}>{nav.children?.length ? <NavItemMulti {...nav} /> : <NavItem {...nav} />}</Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default ShellSideBar;
