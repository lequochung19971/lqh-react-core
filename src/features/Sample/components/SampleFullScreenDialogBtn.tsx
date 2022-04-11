import { forwardRef } from 'react';
import { Button, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import useDialog from '@shared/components/Dialog/useDialog';
import useDialogConfigs from '@shared/components/Dialog/useDialogConfigs';
import SampleFullScreenDialog, { SampleFullScreenDialogProps } from './SampleFullScreenDialog';

const randomInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  const direction = ['up', 'left', 'right', 'down', undefined];
  return (
    <Slide
      direction={direction[randomInRange(0, 4)] as 'up' | 'left' | 'right' | 'down' | undefined}
      ref={ref}
      {...props}
    />
  );
});

const SampleFullScreenDialogBtn: React.FunctionComponent = () => {
  const dialog = useDialog();

  const handleOpen = () => {
    dialog.open<SampleFullScreenDialogProps>(SampleFullScreenDialog);
  };

  useDialogConfigs<SampleFullScreenDialogProps>(
    () => ({
      componentProps: {},
      dialogProps: {
        onClose: () => {
          dialog.close();
        },
        TransitionComponent: Transition,
        fullScreen: true,
      },
    }),
    [dialog],
    dialog,
  );

  return (
    <Button variant="outlined" onClick={handleOpen}>
      Open full-screen dialog
    </Button>
  );
};

export default SampleFullScreenDialogBtn;
