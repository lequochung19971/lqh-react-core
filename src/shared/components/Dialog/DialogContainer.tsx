import React from 'react';
import { useDialogContext } from './DialogContext';
import WrapperDialog from './WrapperDialog';

export const DialogContainer: React.FunctionComponent = () => {
  const { dialogState } = useDialogContext();

  return (
    <>
      {Object.entries(dialogState).map(([key, state]) => {
        return (
          <React.Fragment key={key}>
            <WrapperDialog {...state} />
          </React.Fragment>
        );
      })}
    </>
  );
};
