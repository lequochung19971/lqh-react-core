import { useEffect } from 'react';
import { AnyAction, ReducersMapObject } from 'redux';
import store, { AllReducersType, reducerManager } from './store';
import { RootState } from './types';

const withDynamicReducer = (
  Component: React.ComponentType,
  config: {
    reducers: Partial<ReducersMapObject<RootState, AnyAction>>;
    clearWhenUnmount?: boolean;
  },
) => {
  const keys = Object.keys(config.reducers) as (keyof AllReducersType)[];
  if (!keys.length) {
    reducerManager.add(config.reducers, store.dispatch);
  }

  const Module: React.FunctionComponent = () => {
    useEffect(() => {
      return () => {
        if (config.clearWhenUnmount) {
          reducerManager.remove(keys, store.dispatch);
        }
      };
    }, []);

    return <Component />;
  };
  return Module;
};

export default withDynamicReducer;
