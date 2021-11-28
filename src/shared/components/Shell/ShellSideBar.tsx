import React from 'react';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { navigators } from '@shared/configs';
import { Drawer, Header } from './style';

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
          <ListItem component={Link} button to={nav.path} key={`${nav.name}-${index}`} alignItems="center">
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>{nav.icon}</ListItemIcon>
            <ListItemText primary={nav.name} hidden={!open} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default ShellSideBar;
