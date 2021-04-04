import { useProviderFactory } from 'core/hooks/useProviderFactory';
import React, { useState, Dispatch, SetStateAction } from 'react';

interface LoadingProviderRef {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const { provider: LoadingProvider, useCustomContext: useLoadingContext } = useProviderFactory(
  {} as LoadingProviderRef,
  (context) => {
    const LoadingProvider: React.FunctionComponent = (props) => {
      const [isLoading, setIsLoading] = useState(false);

      const instance: LoadingProviderRef = {
        isLoading,
        setIsLoading,
      };

      return <context.Provider value={instance}>{props.children}</context.Provider>;
    };

    return LoadingProvider;
  },
);
