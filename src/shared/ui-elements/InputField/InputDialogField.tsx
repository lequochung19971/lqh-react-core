import React from 'react';

import { Dialog, DialogProps } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core';

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
