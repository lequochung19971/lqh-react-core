import { useRef } from 'react';
import { CreateDialogResult, DialogConfigs } from '../type';
import useDialog from '../useDialog';
import { ConfirmDialog, ConfirmDialogProps } from './ConfirmDialog';

type UseConfirmDialogProps = {
  open: (config: DialogConfigs<ConfirmDialogProps>) => void;
  close: CreateDialogResult['close'];
};

const useConfirmDialog = (): UseConfirmDialogProps => {
  const dialog = useDialog();
  const confirmDialogRef = useRef<UseConfirmDialogProps>({} as UseConfirmDialogProps);

  const open = (configs: DialogConfigs<ConfirmDialogProps>) => {
    const finalConfigs: DialogConfigs<ConfirmDialogProps> = {
      ...configs,
      dialogProps: {
        // Default
        fullWidth: true,
        maxWidth: 'xs',

        ...configs.dialogProps,
      },
    };
    dialog.open(ConfirmDialog, finalConfigs);
  };

  confirmDialogRef.current.open = open;
  confirmDialogRef.current.close = dialog.close;

  return confirmDialogRef.current;
};

export default useConfirmDialog;
