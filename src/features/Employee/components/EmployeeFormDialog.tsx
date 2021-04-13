import { AppBar, Box, Button, Dialog, DialogProps, IconButton, Slide, Toolbar, Typography } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useFormDialogStyles } from '../styles/styles';
import EmployeeForm from './EmployeeForm';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeeFormDialog: React.FunctionComponent<DialogProps> = (props) => {
  const classes = useFormDialogStyles();
  const { onClose, ...restProps } = props;

  const handleClose = () => {
    if (onClose) {
      onClose({}, 'escapeKeyDown');
    }
  };

  return (
    <>
      <Dialog fullScreen {...restProps} onClose={onClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
              <Box display="flex" flexWrap="nowrap" alignItems="center">
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6">New Employee</Typography>
              </Box>
              <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <EmployeeForm />
      </Dialog>
    </>
  );
};

export default EmployeeFormDialog;
