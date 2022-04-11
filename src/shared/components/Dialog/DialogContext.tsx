import { isEqual } from 'lodash';
import React, { useCallback, useRef, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { createContext } from '@shared/utils';
import { DialogContainer } from './DialogContainer';
import {
  CreateDialogResult,
  DialogContextRef,
  DialogState,
  DialogGroup,
  WrapperDialogProps,
  DialogConfigs,
  DialogOnCloseArgs,
} from './type';

export const [DialogContext, useDialogContext] = createContext<DialogContextRef>({} as DialogContextRef);

export const DialogProvider: React.FunctionComponent = (props) => {
  const { children } = props;
  const [dialogGroup, setDialogGroup] = useState<DialogGroup>({});
  const dialogGroupRef = useRef<DialogGroup>({});

  /**
   * This function is used to change `dialogGroup` and `dialogGroupRef`. It likes `useState` of `React`
   */
  const loadState = useCallback(
    <Props extends unknown>(dialogId?: string, dialogState?: Partial<DialogState<Props>>) => {
      if (dialogId && dialogState) {
        dialogGroupRef.current = {
          ...dialogGroupRef.current,
          [dialogId]: {
            ...(dialogGroupRef.current[dialogId] ?? {}),
            ...dialogState,
            id: dialogId,
          },
        };
      }
      setDialogGroup({ ...dialogGroupRef.current });
    },
    [],
  );

  /**
   * This function is used to remove dialog from `dialogGroup/dialogGroupRef` by ID
   */
  const destroyDialogById = useCallback(
    (id: string) => {
      delete dialogGroupRef.current[id];
      loadState();
    },
    [loadState],
  );

  /**
   * This function to create the `close` function depend on the dialog ID.
   * @param id The ID of current dialog
   */
  const createClose = useCallback(
    (id: string) => {
      return function close(option?: { notDestroy?: boolean }) {
        loadState(id, {
          isOpen: false,
        });

        if (!option?.notDestroy) {
          destroyDialogById(id);
        }
      } as CreateDialogResult['close'];
    },
    [destroyDialogById, loadState],
  );

  /**
   * This function to create the `open` function depend on the dialog ID.
   *
   * When open() is implemented => configs will be saved into dialogGroup
   * @param id The ID of current dialog
   */
  const createOpen = useCallback(
    (id: string) => {
      return function open<ComponentProps>(
        component: React.FunctionComponent<WrapperDialogProps<ComponentProps>>,
        configs: any,
      ): void {
        loadState(id, {
          isOpen: true,
          // close: createClose(id),
          component,
          configs,
        });
      };
    },
    [loadState],
  );

  /**
   * This function to create the `loadConfigs` function depend on the dialog ID.
   * @param id The ID of current dialog
   */
  const createLoadConfigs = useCallback(
    (id: string) => {
      /**
       * This function is used for loading the dialog configs.
       *
       * It's also used for loading when having any configs change.
       */
      return function loadConfigs<ComponentProps extends any>(configs: DialogConfigs<ComponentProps>) {
        if (!id || !dialogGroupRef.current[id]) return;

        const isChange = !isEqual(dialogGroupRef.current[id].configs, configs);

        if (isChange) {
          console.log('Loading Configs', id);
          loadState(id, { configs });
        }
      };
    },
    [loadState],
  );

  const createOnClose = useCallback((id: string) => {
    return function onClose(data?: DialogOnCloseArgs) {
      const currentDialog = dialogGroupRef.current[id];

      if (currentDialog?.configs?.dialogProps?.onClose) {
        currentDialog.configs.dialogProps.onClose(data);
      }
    };
  }, []);

  /**
   * This function to create dialog ID.
   *
   * Based on this ID to differentiate the dialogs.
   * @returns {CreateDialogResult}
   */
  const createDialog = useCallback((): CreateDialogResult => {
    const id = `Dialog-${nanoid()}`;

    return {
      id,
      open: createOpen(id),
      close: createClose(id),
      loadConfigs: createLoadConfigs(id),
      onClose: createOnClose(id),
    };
  }, [createClose, createLoadConfigs, createOnClose, createOpen]);

  const value = {
    dialogGroup,
    setDialogGroup,
    dialogGroupRef,
    createDialog,
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
      <DialogContainer />
    </DialogContext.Provider>
  );
};
