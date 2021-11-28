import React from 'react';
import { Dialog, DialogProps } from '@mui/material';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material';

type InputDialogFieldProps = TextFieldProps & {
  dialogProps?: DialogProps;
};

export const InputDialogField = React.forwardRef<any, InputDialogFieldProps>(function InputDialogField(props, ref) {
  const { children, dialogProps = {} as DialogProps, ...textFieldProps } = props;

  const hanldePreventChange = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <TextField {...textFieldProps} onKeyDown={hanldePreventChange} ref={ref} />
      <Dialog {...dialogProps}>{children}</Dialog>
    </>
  );
});
