import { useState, Dispatch, SetStateAction } from 'react';

import { createContext } from '@shared/utils';

interface LoadingContextRef {
  isPageLoading: boolean;
  setIsPageLoading: Dispatch<SetStateAction<boolean>>;
}

export const [LoadingContext, useLoadingContext] = createContext<LoadingContextRef>({} as LoadingContextRef);

type Props = {
  test: boolean;
};

export const LoadingProvider: React.FunctionComponent<Props> = (props) => {
  const [isPageLoading, setIsPageLoading] = useState(false);

  const instances: LoadingContextRef = {
    isPageLoading,
    setIsPageLoading,
  };

  return <LoadingContext.Provider value={instances}>{props.children}</LoadingContext.Provider>;
};
