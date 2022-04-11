import React from 'react';
import { useDialogContext } from './DialogContext';
import WrapperDialog from './WrapperDialog';

export const DialogContainer: React.FunctionComponent = () => {
  const { dialogGroup } = useDialogContext();

  return (
    <>
      {Object.entries(dialogGroup).map(([key, state]) => {
        return (
          <React.Fragment key={key}>
            <WrapperDialog {...state} />
          </React.Fragment>
        );
      })}
    </>
  );
};
