import { useCallback, useEffect, useRef } from 'react';
import { useDialogContext } from './DialogContext';
import { CreateDialogResult, DialogConfigs, WrapperDialogProps } from './type';

export type UseDialogReturn = Omit<CreateDialogResult, 'open'> & {
  loadConfigs: <ComponentProps extends any>(config: DialogConfigs<ComponentProps>) => void;
  open: <ComponentProps extends unknown>(
    component: React.FunctionComponent<WrapperDialogProps<ComponentProps>>,
    configs?: DialogConfigs<ComponentProps>,
  ) => void;
};

const useDialog = () => {
  const { createDialog } = useDialogContext();
  const dialogReturnRef = useRef<UseDialogReturn>({} as UseDialogReturn);
  const dialogResultRef = useRef<CreateDialogResult>({} as CreateDialogResult);
  const configsRef = useRef<DialogConfigs>({});

  useEffect(() => {
    const result = createDialog();
    dialogResultRef.current = result;
  }, [createDialog]);

  /**
   * @param {DialogConfigs<ComponentProps>} configs Dialog configs. Notice that using useMemo for configs to make sure not re-render.
   */
  const loadConfigs = useCallback(<ComponentProps extends any>(configs: DialogConfigs<ComponentProps>) => {
    configsRef.current = configs;
    dialogResultRef.current.loadConfigs(configsRef.current);
  }, []);

  const open = useCallback(
    <ComponentProps extends unknown>(
      component: React.FunctionComponent<WrapperDialogProps<ComponentProps>>,
      configs?: DialogConfigs<ComponentProps>,
    ) => {
      configsRef.current = configs ?? configsRef.current;
      dialogResultRef.current.open(component, configsRef.current);
    },
    [dialogResultRef],
  );

  dialogReturnRef.current.open = open;
  dialogReturnRef.current.loadConfigs = loadConfigs;
  dialogReturnRef.current.close = dialogResultRef.current.close;
  dialogReturnRef.current.onClose = dialogResultRef.current.onClose;

  return dialogReturnRef.current;
};

export default useDialog;
