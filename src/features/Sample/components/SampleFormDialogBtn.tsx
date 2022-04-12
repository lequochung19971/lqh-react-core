import { useState } from 'react';
import { Button } from '@mui/material';
import useDialog from '@shared/components/Dialog/useDialog';
import useDialogConfigs from '@shared/components/Dialog/useDialogConfigs';
import SampleFormDialog, { SampleFormDialogProps } from './SampleFormDialog';

const SampleFormDialogBtn: React.FunctionComponent = () => {
  const dialog = useDialog();
  const [email, setEmail] = useState('');

  const handleOpen = () => {
    dialog.open<SampleFormDialogProps>(SampleFormDialog);
  };

  useDialogConfigs<SampleFormDialogProps>(
    () => ({
      componentProps: {
        setEmail,
      },
      dialogProps: {
        onClose: () => {
          dialog.close();
        },
      },
    }),
    [dialog],
    dialog,
  );

  return (
    <div>
      <p>Sample Form Dialog</p>
      <Button variant="outlined" onClick={handleOpen}>
        Open form dialog
      </Button>
      <div>Email: {email}</div>
    </div>
  );
};

export default SampleFormDialogBtn;
