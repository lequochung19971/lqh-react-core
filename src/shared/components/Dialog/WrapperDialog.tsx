import { Dialog } from '@mui/material';
import { DialogRef, DialogState } from './type';

const WrapperDialog: React.FunctionComponent<DialogState> = (props) => {
  const { id, isOpen, close, onClosePromise, component: Component, dialogConfig = {} } = props;

  const { props: componentProps = {}, ...restConfig } = dialogConfig;

  const dialogRef = {
    id,
    close,
    onClose: onClosePromise ? () => onClosePromise : undefined,
  } as DialogRef;

  return (
    <Dialog {...restConfig} open={!!isOpen} onClose={() => !!close && close(null)}>
      <Component {...componentProps} dialogRef={dialogRef} />
    </Dialog>
  );
};

export default WrapperDialog;
