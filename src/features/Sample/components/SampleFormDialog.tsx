import React, { Dispatch, SetStateAction, useState } from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { WrapperDialogProps } from '@shared/components/Dialog/type';

export type SampleFormDialogProps = {
  setEmail: Dispatch<SetStateAction<string>>;
};

const SampleFormDialog: React.FunctionComponent<WrapperDialogProps<SampleFormDialogProps>> = (props) => {
  const [fieldValue, setFieldValue] = useState('');
  const { setEmail, dialogRef } = props;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  const handleSubscribe = () => {
    setEmail(fieldValue);
    dialogRef.onClose && dialogRef.onClose();
  };
  return (
    <>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={fieldValue}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dialogRef.onClose && dialogRef.onClose({ value: false })}>Cancel</Button>
        <Button onClick={handleSubscribe}>Subscribe</Button>
      </DialogActions>
    </>
  );
};

export default SampleFormDialog;
