import { useCallback } from 'react';
import { Button } from '@mui/material';
import { DialogOnCloseArgs } from '@shared/components/Dialog/type';
import useDialog from '@shared/components/Dialog/useDialog';
import useDialogConfigs from '@shared/components/Dialog/useDialogConfigs';
import { Transition } from './SampleFullScreenDialogBtn';
import SampleNestedDialog, { SampleNestedDialogProps } from './SampleNestedDialog';

const SampleNestedDialogBtn: React.FunctionComponent = () => {
  const dialog = useDialog();

  const onClose = useCallback(
    (data?: DialogOnCloseArgs) => {
      dialog.close();
      console.log('onClose', data?.value);
    },
    [dialog],
  );

  const handleClick = () => {
    dialog.open(SampleNestedDialog);
  };

  useDialogConfigs<SampleNestedDialogProps>(
    () => ({
      componentProps: {
        title: 'Parent',
      },
      dialogProps: {
        onClose,
        TransitionComponent: Transition,
      },
    }),
    [onClose],
    dialog,
  );

  return (
    <div>
      <p>Sample Nested Dialog: </p>
      <Button variant="outlined" onClick={handleClick}>
        Open Nested Dialog
      </Button>
    </div>
  );
};

export default SampleNestedDialogBtn;
