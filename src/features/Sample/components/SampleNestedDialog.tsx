import { useCallback } from 'react';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { WrapperDialogProps } from '@shared/components/Dialog/type';
import useDialog from '@shared/components/Dialog/useDialog';
import useDialogConfigs from '@shared/components/Dialog/useDialogConfigs';
import { Transition } from './SampleFullScreenDialogBtn';

export type SampleNestedDialogProps = {
  title: string;
};

const SampleNestedDialog: React.FunctionComponent<WrapperDialogProps<SampleNestedDialogProps>> = (props) => {
  const { title, dialogRef } = props;
  const dialog = useDialog();

  const onClose = useCallback(() => {
    console.log('close', dialogRef.id);
    dialog.close();
  }, [dialog, dialogRef.id]);

  useDialogConfigs<SampleNestedDialogProps>(
    () => ({
      componentProps: {
        title: dialogRef.id,
      },
      dialogProps: {
        onClose,
        TransitionComponent: Transition,
      },
    }),
    [dialogRef.id, onClose],
    dialog,
  );

  const handleClick = () => {
    dialog.open(SampleNestedDialog);
  };

  return (
    <>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no
          apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dialogRef.onClose && dialogRef.onClose({ value: dialogRef.id })}>Close</Button>
        <Button onClick={handleClick}>Open Other Dialog</Button>
      </DialogActions>
    </>
  );
};

export default SampleNestedDialog;
