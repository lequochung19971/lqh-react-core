import React, { useEffect, useRef, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { createContext } from '@shared/utils';
import {
  CreateDialogResult,
  DialogConfig,
  DialogContextRef,
  DialogRef,
  DialogState,
  PromiseResolveReject,
  StateGroup,
  WrapperDialogProps,
} from './type';
import { DialogContainer } from './DialogContainer';

export const createPromiseResolveReject = (): PromiseResolveReject => {
  const promiseCallback: { resolve: PromiseResolveReject[1] | null; reject: PromiseResolveReject[2] | null } = {
    resolve: null,
    reject: null,
  };

  const promise = new Promise((resolve, reject) => {
    promiseCallback.resolve = resolve;
    promiseCallback.reject = reject;
  });
  return [promise, promiseCallback.resolve, promiseCallback.reject];
};

export const [DialogContext, useDialogContext] = createContext<DialogContextRef>({} as DialogContextRef);

export const DialogProvider: React.FunctionComponent = (props) => {
  const { children } = props;
  const [state, setState] = useState<StateGroup>({});
  const stateRef = useRef<StateGroup>({});

  const loadState = <Props extends any>(dialogId?: string, dialogData?: Partial<DialogState<Props>>) => {
    if (dialogId && dialogData) {
      stateRef.current = {
        ...stateRef.current,
        [dialogId]: {
          ...((stateRef.current[dialogId] ?? {}) as DialogState),
          ...dialogData,
          id: dialogId,
        },
      };
    }
    setState({
      ...stateRef.current,
    });
  };

  const destroyStateById = (id: string) => {
    delete stateRef.current[id];
    loadState();
  };

  const handleClose = (id: string) => {
    return function close(value: unknown) {
      const currentStateRef = stateRef.current[id];

      if (currentStateRef && currentStateRef?.onCloseResolve) {
        currentStateRef.onCloseResolve(value);
      }

      loadState(id, {
        isOpen: false,
        onClosePromise: undefined,
        onCloseResolve: undefined,
      });
    };
  };

  const handleOpen = (id: string) => {
    return function open<Props = any>(component: React.FunctionComponent<WrapperDialogProps<Props>>, config?: DialogConfig): DialogRef {
      const [onClosePromise, onCloseResolve] = createPromiseResolveReject();

      loadState<Props>(id, {
        isOpen: true,
        component,
        dialogConfig: config,
        close: handleClose(id),
        onClosePromise: onClosePromise,
        onCloseResolve: onCloseResolve,
      });

      return {
        id,
        close: stateRef.current[id].close,
        onClose: () => stateRef.current[id].onClosePromise,
      } as DialogRef;

      /** Return using Promise */
      // return new Promise((resolve) => {
      //   stateRef.current = {
      //     ...stateRef.current,
      //     [id]: {
      //       ...(stateRef.current[id] ?? {}),
      //       close: handleClose(id),
      //       onClose: resolve,
      //     },
      //   };
      //   updateState();
      // });
    };
  };

  const handleDestroy = (id: string) => {
    return () => {
      destroyStateById(id);
    };
  };

  const createDialog = (): CreateDialogResult => {
    const id = nanoid();

    return {
      open: handleOpen(id),
      // close: handleClose(id),
      destroy: handleDestroy(id),
    };
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  const instance = {
    dialogState: state,
    createDialog,
  };

  return (
    <DialogContext.Provider value={instance}>
      {children}
      <DialogContainer />
    </DialogContext.Provider>
  );
};

