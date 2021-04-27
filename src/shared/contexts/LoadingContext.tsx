import { createContext } from '@shared/utils';
import React, { useState, Dispatch, SetStateAction } from 'react';

interface LoadingContextRef {
  isPageLoading: boolean;
  setIsPageLoading: Dispatch<SetStateAction<boolean>>;
}

export const { LoadingProvider, useLoadingContext, LoadingContext } = createContext<'loading', LoadingContextRef>({
  displayName: 'loading',
  defaultValue: {} as LoadingContextRef,
  providerComponent: (Context) => {
    const LoadingProvider: React.FunctionComponent = (props) => {
      const [isPageLoading, setIsPageLoading] = useState(false);

      const instance: LoadingContextRef = {
        isPageLoading,
        setIsPageLoading,
      };

      return <Context.Provider value={instance}>{props.children}</Context.Provider>;
    };

    return LoadingProvider;
  },
});
