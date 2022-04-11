import { CreateDialogResult, DialogConfigs } from '../type';
import useDialog from '../useDialog';
import { ConfirmDialog, ConfirmDialogProps } from './ConfirmDialog';

type UseConfirmDialogProps = {
  open: (config: DialogConfigs<ConfirmDialogProps>) => void;
  close: CreateDialogResult['close'];
};

const useConfirmDialog = (): UseConfirmDialogProps => {
  const dialog = useDialog();

  const open = (config: DialogConfigs<ConfirmDialogProps>) => {
    dialog.open(ConfirmDialog, config);
  };

  const close = dialog.close;

  return {
    open,
    close,
  };
};

export default useConfirmDialog;
