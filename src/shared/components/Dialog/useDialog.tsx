import { useEffect, useRef, useState } from 'react';
import { useDialogContext } from './DialogContext';
import { CreateDialogResult } from './type';

const useDialog = () => {
  const { createDialog } = useDialogContext();
  const [dialog, setDialog] = useState<CreateDialogResult>({} as CreateDialogResult);
  const dialogRef = useRef<CreateDialogResult>({} as CreateDialogResult);

  useEffect(() => {
    dialogRef.current = createDialog();
    setDialog(dialogRef.current);
    return () => {
      dialogRef.current.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dialog;
};

export default useDialog;
