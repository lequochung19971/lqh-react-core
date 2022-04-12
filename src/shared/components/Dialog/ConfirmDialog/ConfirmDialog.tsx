import {
  Box,
  Button,
  ButtonProps,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { WrapperDialogProps } from '../type';
import StatusIcons from './StatusIcons';

type ButtonType = ButtonProps & {
  text?: string;
  hide?: boolean;
};

export type ConfirmDialogProps = {
  title?: string;
  content?: string;
  icon?: 'error' | 'warning' | 'success' | 'info' | 'question';
  cancelButton?: ButtonType;
  okButton?: ButtonType;
};

const cancelButtonDefault: ButtonType = {
  variant: 'contained',
  color: 'secondary',
  size: 'large',
  text: 'Cancel',
};

const okButtonDefault: ButtonType = {
  variant: 'contained',
  color: 'primary',
  size: 'large',
  text: 'Confirm',
};

export const ConfirmDialog: React.FunctionComponent<WrapperDialogProps<ConfirmDialogProps>> = (props) => {
  const { dialogRef, icon, title = '', content, cancelButton = {}, okButton = {} } = props;

  const {
    text: cancelText,
    hide: hideCancel,
    ...cancelButtonConfigs
  } = {
    ...cancelButtonDefault,
    ...cancelButton,
  };

  const {
    text: okText,
    hide: hideOk,
    ...okButtonConfigs
  } = {
    ...okButtonDefault,
    ...okButton,
  };

  const handleClose = (value: unknown) => {
    dialogRef.onClose && dialogRef.onClose({ value });
  };

  return (
    <>
      <Box marginTop={3}>
        <StatusIcons type={icon} />
      </Box>
      <DialogTitle
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          textAlign: 'center',
        }}
      >
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          marginBottom: 2,
        }}
      >
        {!hideCancel && (
          <Button {...cancelButtonConfigs} onClick={() => handleClose(false)}>
            {cancelText}
          </Button>
        )}

        {!hideOk && (
          <Button {...okButtonConfigs} onClick={() => handleClose(true)}>
            {okText}
          </Button>
        )}
      </DialogActions>
    </>
  );
};
