import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getMe } from '@features/Auth/authSlice';
import { Box } from '@mui/material';
import { useDispatch } from '@store';
import PageLoading from '../PageLoading/PageLoading';
import ShellHeader from './ShellHeader';
import ShellMain from './ShellMain';
import ShellSideBar from './ShellSideBar';

const Shell: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const doGetMe = async () => {
      try {
        await dispatch(getMe()).unwrap();
      } catch (error) {
        navigate('/auth');
      }
    };
    doGetMe();
  }, [dispatch, navigate]);

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
