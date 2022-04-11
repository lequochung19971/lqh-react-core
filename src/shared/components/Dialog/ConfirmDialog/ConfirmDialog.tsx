import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { WrapperDialogProps } from '../type';

export type ConfirmDialogProps = {};

export const ConfirmDialog: React.FunctionComponent<WrapperDialogProps<ConfirmDialogProps>> = (props) => {
  const { dialogRef } = props;

  const handleClose = (value: unknown) => {
    dialogRef.onClose && dialogRef.onClose({ value });
  };

  return (
    <>
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to confirm ?.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => handleClose(null)} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={() => handleClose(true)}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
};
