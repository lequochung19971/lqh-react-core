import { useProviderFactory } from '@shared/hooks/useProviderFactory';
import React, { useState, Dispatch, SetStateAction } from 'react';

interface LoadingProviderRef {
  isPageLoading: boolean;
  setIsPageLoading: Dispatch<SetStateAction<boolean>>;
}

export const { provider: LoadingProvider, useCustomContext: useLoadingContext } = useProviderFactory(
  {} as LoadingProviderRef,
  (Context) => {
    const LoadingProvider: React.FunctionComponent = (props) => {
      const [isPageLoading, setIsPageLoading] = useState(false);

      const instance: LoadingProviderRef = {
        isPageLoading,
        setIsPageLoading,
      };

      return <Context.Provider value={instance}>{props.children}</Context.Provider>;
    };

    return LoadingProvider;
  },
);
