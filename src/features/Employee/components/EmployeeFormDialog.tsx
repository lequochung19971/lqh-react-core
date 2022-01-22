import React from 'react';
import { css } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Box, Dialog, DialogProps, IconButton, Toolbar, Typography } from '@mui/material';
import EmployeeForm from './EmployeeForm';

const EmployeeFormDialog: React.FunctionComponent<DialogProps> = (props) => {
  const { onClose, ...restProps } = props;

  const handleClose = () => {
    if (onClose) {
      onClose({}, 'escapeKeyDown');
    }
  };

  return (
    <>
      <Dialog fullScreen {...restProps} onClose={onClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
              <Box display="flex" flexWrap="nowrap" alignItems="center">
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6">New Employee</Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <EmployeeForm />
      </Dialog>
    </>
  );
};

export default EmployeeFormDialog;
