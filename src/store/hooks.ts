import {
  TypedUseSelectorHook,
  useDispatch as useOriginalDispatch,
  useSelector as useOriginalSelector,
} from 'react-redux';

import { AppDispatch, RootState } from './types';

export * from 'react-redux';
export const useDispatch = (): AppDispatch => useOriginalDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useOriginalSelector;
