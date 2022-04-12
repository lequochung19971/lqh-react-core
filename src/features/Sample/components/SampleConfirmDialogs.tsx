import { Button } from '@mui/material';
import useConfirmDialog from '@shared/components/Dialog/ConfirmDialog/useConfirmDialog';
import { DialogOnCloseArgs } from '@shared/components/Dialog/type';

const SampleConfirmDialogs: React.FunctionComponent = () => {
  const confirmDialog = useConfirmDialog();

  const handleOpenError = () => {
    confirmDialog.open({
      componentProps: {
        title: 'Error',
        content: 'Do you want to confirm?',
        icon: 'error',
      },
      dialogProps: {
        onClose: (data?: DialogOnCloseArgs) => {
          console.log(data?.value);
          confirmDialog.close();
        },
      },
    });
  };

  const handleOpenWarning = () => {
    confirmDialog.open({
      componentProps: {
        title: 'Warning',
        content: 'Do you want to confirm?',
        icon: 'warning',
      },
      dialogProps: {
        onClose: (data?: DialogOnCloseArgs) => {
          console.log(data?.value);
          confirmDialog.close();
        },
      },
    });
  };

  const handleOpenSuccess = () => {
    confirmDialog.open({
      componentProps: {
        title: 'Success',
        content: 'Do you want to confirm?',
        icon: 'success',
      },
      dialogProps: {
        onClose: (data?: DialogOnCloseArgs) => {
          console.log(data?.value);
          confirmDialog.close();
        },
      },
    });
  };
  const handleOpenInfo = () => {
    confirmDialog.open({
      componentProps: {
        title: 'Info',
        content: 'Do you want to confirm?',
        icon: 'info',
      },
      dialogProps: {
        onClose: (data?: DialogOnCloseArgs) => {
          console.log(data?.value);
          confirmDialog.close();
        },
      },
    });
  };
  const handleOpenQuestion = () => {
    confirmDialog.open({
      componentProps: {
        title: 'Question?',
        content: 'Do you want to confirm?',
        icon: 'question',
        cancelButton: {
          hide: true,
        },
        okButton: {
          text: 'Ok',
        },
      },
      dialogProps: {
        onClose: (data?: DialogOnCloseArgs) => {
          console.log(data?.value);
          confirmDialog.close();
        },
      },
    });
  };

  return (
    <div>
      <p>Sample Confirm Dialog:</p>
      <Button variant="outlined" onClick={handleOpenError}>
        Error Dialog
      </Button>
      <Button variant="outlined" onClick={handleOpenWarning}>
        Warning Dialog
      </Button>
      <Button variant="outlined" onClick={handleOpenSuccess}>
        Success Dialog
      </Button>
      <Button variant="outlined" onClick={handleOpenInfo}>
        Info Dialog
      </Button>
      <Button variant="outlined" onClick={handleOpenQuestion}>
        Question Dialog
      </Button>
    </div>
  );
};

export default SampleConfirmDialogs;
