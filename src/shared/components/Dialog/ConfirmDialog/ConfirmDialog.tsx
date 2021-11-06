import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { WrapperDialogProps } from '../type';

export const ConfirmDialog: React.FunctionComponent<WrapperDialogProps<{}>> = (props) => {
  const { dialogRef } = props;

  const handleClose = (value: unknown) => {
    dialogRef.close && dialogRef.close(value);
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
