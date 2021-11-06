import { useState } from 'react';
import { DialogConfig, DialogRef } from '../type';
import useDialog from '../useDialog';
import { ConfirmDialog } from './ConfirmDialog';

type UseConfirmDialogProps = {
  open: (config?: DialogConfig) => Promise<unknown>;
  close: (value: unknown) => void;
};

const useConfirmDialog = (): UseConfirmDialogProps => {
  const dialog = useDialog();
  const [dialogState, setDialogState] = useState<DialogRef>();

  const open = (config?: any): Promise<unknown> => {
    const dialogRef = dialog.open(ConfirmDialog, {
			props: {}
		});
    setDialogState(dialogRef);
    return dialogRef.onClose();
  };

  const close = (value: unknown) => {
    if (dialogState) {
      dialogState.close(value);
    }
  };

  return {
    open,
    close,
  };
};

export default useConfirmDialog;
