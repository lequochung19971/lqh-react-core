import { DialogProps as MuiDialogProps } from '@mui/material';

export type DialogContextRef = {
  dialogGroup: DialogGroup;
  setDialogGroup: React.Dispatch<React.SetStateAction<DialogGroup>>;
  dialogGroupRef: React.MutableRefObject<DialogGroup>;
  createDialog: () => CreateDialogResult;
};

export type DialogOnCloseArgs = {
  event?: {};
  reason?: 'backdropClick' | 'escapeKeyDown';
  value?: unknown;
};

export type DialogOnClose = (args?: DialogOnCloseArgs) => void;

export type DialogProps = Omit<MuiDialogProps, 'open' | 'onClose'> & {
  onClose?: DialogOnClose;
};

export type DialogConfigs<Props = any> = {
  /**
   * The props used into the component that you pass into open() function.
   */
  componentProps?: Props;

  /**
   * The props of Material UI Dialog: {@link https://mui.com/material-ui/api/dialog/}
   */
  dialogProps?: DialogProps;
};

export type DialogState<Props = any> = {
  /**
   * ID of current created dialog
   */
  id: string;

  isOpen?: boolean;

  /**
   * The component passed inside Dialog.
   * NOTE: Should use WrapperDialogProps to wrap the Props of component
   */
  component: React.FunctionComponent<WrapperDialogProps<Props>>;
  // close?: (value: unknown) => void;

  configs: DialogConfigs<Props>;
};

export type DialogGroup = {
  [key: string]: DialogState;
};

/**
 * The result is returned from createDialog function in `DialogContext.tsx`
 */
export type CreateDialogResult = {
  id: string;

  /**
   * @param {React.FunctionComponent<WrapperDialogProps<ComponentProps>>} component
   * @param {DialogConfigs<ComponentProps>} configs: If you want to handle right after using `open()` function, you should use it. If not, you `useDialogConfigs`
   */
  open: <ComponentProps extends unknown>(
    component: React.FunctionComponent<WrapperDialogProps<ComponentProps>>,
    configs?: DialogConfigs<ComponentProps>,
  ) => void;

  /**
   * To close the dialog. This function will destroy the dialog as default. If you want to close only without destroy. Please set `options.notDestroy = true`
   */
  close: (options?: { notDestroy?: boolean }) => void;

  /**
   * To load configs for the Dialog
   */
  loadConfigs: <ComponentProps extends unknown>(configs: DialogConfigs<ComponentProps>) => void;

  /**
   * Listen onClose event
   */
  onClose: DialogOnClose; // Close Event
};

/**
 * This object is passed inside Components like component props.
 */
export type DialogRef = {
  id: string;
  isOpen: boolean;
  onClose?: CreateDialogResult['onClose']; // Close Event
};

/**
 * Should use it to wrap the Props of component
 */
export type WrapperDialogProps<ComponentProps = unknown> = ComponentProps & {
  dialogRef: DialogRef;
};
