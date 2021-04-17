import { useContextFactory } from '@shared/hooks/useContextFactory';
import React, { useState, Dispatch, SetStateAction } from 'react';

interface LoadingContextRef {
  isPageLoading: boolean;
  setIsPageLoading: Dispatch<SetStateAction<boolean>>;
}

export const { LoadingProvider, useLoadingContext, LoadingContext } = useContextFactory<'loading', LoadingContextRef>(
  'loading',
  {} as LoadingContextRef,
  (Context) => {
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
);