import { createContext, useContext } from 'react';

interface useProviderFactoryRef<TRef> {
  context: React.Context<TRef>;
  provider: React.FunctionComponent;
  useCustomContext: () => TRef;
}

export function useProviderFactory<TRef extends unknown = any>(
  defaultValue: TRef,
  callback: (currentContext: React.Context<TRef>) => React.FunctionComponent,
): useProviderFactoryRef<TRef> {
  const context = createContext<TRef>(defaultValue);
  const provider = callback(context);
  const useCustomContext = (): TRef => useContext<TRef>(context);
  return {
    context,
    provider,
    useCustomContext,
  };
}