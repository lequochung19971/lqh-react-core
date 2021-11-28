import React from 'react';
import { Box } from '@mui/material';
import { Header } from './style';

const ShellMain: React.FunctionComponent = (props) => {
  return (
    <Box p={2} flexGrow={1}>
      <Header />
      {props.children}
    </Box>
  );
};

export default ShellMain;
