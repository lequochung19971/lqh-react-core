import { useEffect, useMemo } from 'react';
import { DialogConfigs } from './type';
import { UseDialogReturn } from './useDialog';

/**
 * This hook is used to load configs for the dialog and will load again every time the items of deps change.
 *
 * NOTE: This hook is used like the core hook of react: `useCallback`, `useMemo`,...
 * @param factory
 * @param deps
 * @param dialog: the value is returned form `useDialog()` hook
 */
export default function useDialogConfigs<T>(
  factory: () => DialogConfigs<T>,
  deps: ReadonlyArray<any> | undefined,
  dialog: UseDialogReturn,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const configs = useMemo<DialogConfigs<T>>(factory, deps);

  useEffect(() => {
    dialog.loadConfigs(configs);
  }, [configs, dialog]);
}
