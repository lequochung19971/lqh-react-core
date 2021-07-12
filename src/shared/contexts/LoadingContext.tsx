import { createContext } from '@shared/utils';
import { useState, Dispatch, SetStateAction } from 'react';

interface LoadingContextRef {
  isPageLoading: boolean;
  setIsPageLoading: Dispatch<SetStateAction<boolean>>;
}

export const [LoadingProvider, useLoadingContext, LoadingContext] = createContext<LoadingContextRef, { test: boolean }>(
  {
    useProvider: () => {
      const [isPageLoading, setIsPageLoading] = useState(false);

      const instances: LoadingContextRef = {
        isPageLoading,
        setIsPageLoading,
      };

      return instances;
    },
  },
);
