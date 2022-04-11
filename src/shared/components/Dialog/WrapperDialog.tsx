import { Dialog, ModalProps } from '@mui/material';
import { DialogRef, DialogState } from './type';

const WrapperDialog: React.FunctionComponent<DialogState> = (props) => {
  const { id, isOpen, component: Component, configs } = props;
  const { componentProps = {}, dialogProps = {} } = configs ?? {};

  const handleClose: ModalProps['onClose'] = (event, reason) => {
    dialogProps?.onClose &&
      dialogProps.onClose({
        event,
        reason,
      });
  };

  /**
   * @Object dialogRef will be pass into every components
   */
  const dialogRef = {
    id,
    isOpen,
    onClose: dialogProps?.onClose,
  } as DialogRef;

  return (
    <Dialog {...dialogProps} open={!!isOpen} onClose={handleClose}>
      <Component {...componentProps} dialogRef={dialogRef} />
    </Dialog>
  );
};

export default WrapperDialog;
