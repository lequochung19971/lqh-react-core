import React from 'react';

import { Box } from '@material-ui/core';

import { useShellStyles } from './useShellStyle';

const ShellMain: React.FunctionComponent = (props) => {
  const classes = useShellStyles();

  return (
    <Box p={2} flexGrow={1}>
      <div className={classes.toolbar} />
      {props.children}
    </Box>
  );
};

export default ShellMain;
