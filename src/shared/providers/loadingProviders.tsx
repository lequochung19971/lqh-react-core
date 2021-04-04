import { useProviderFactory } from 'core/hooks/useProviderFactory';
import React, { useState, Dispatch, SetStateAction } from 'react';

interface LoadingProviderRef {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const { provider: LoadingProvider, useCustomContext: useLoadingContext } = useProviderFactory(
  {} as LoadingProviderRef,
  (Context) => {
    const LoadingProvider: React.FunctionComponent = (props) => {
      const [isLoading, setIsLoading] = useState(false);

      const instance: LoadingProviderRef = {
        isLoading,
        setIsLoading,
      };

      return <Context.Provider value={instance}>{props.children}</Context.Provider>;
    };

    return LoadingProvider;
  },
);
