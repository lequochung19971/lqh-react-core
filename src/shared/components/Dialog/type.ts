import { DialogProps } from '@mui/material';

export type PromiseResolveReject<T = unknown> = [
  Promise<T> | null | undefined,
  ((value: T) => void) | null | undefined,
  ((reason?: any) => void) | null | undefined,
];

export type DialogRef = {
  id: string;
  close: (value: unknown) => void;
  onClose: () => Promise<unknown>;
};

export type DialogContextRef = {
  dialogState: StateGroup;
  createDialog: () => CreateDialogResult;
};

export type DialogConfig<Props = any> = Omit<DialogProps, 'open' | 'onClose'> & {
  props?: Props;
};

export type DialogState<Props = any> = {
  id?: string;
  isOpen?: boolean;
  component: React.FunctionComponent<WrapperDialogProps<Props>>;
  close?: (value: unknown) => void;
  dialogConfig?: DialogConfig;
  onClosePromise?: PromiseResolveReject[0];
  onCloseResolve?: PromiseResolveReject[1];
};

export type StateGroup = {
  [key: string]: DialogState;
};

export type CreateDialogResult = {
  open: (component: React.FunctionComponent<WrapperDialogProps<any>>, config?: DialogConfig) => DialogRef;
  destroy: () => void;
  // close?: (value: unknown) => void;
};

export type WrapperDialogProps<OtherProps> = OtherProps & {
  dialogRef: DialogRef;
};
