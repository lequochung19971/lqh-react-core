/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext as createOriginalContext, useContext } from 'react';

type UseContext<TRef> = () => TRef;
type CreateContextResult<TRef> = [React.Context<TRef>, UseContext<TRef>];

export function createContext<TRef extends object = object>(defaultValue: TRef): CreateContextResult<TRef> {
  const context = createOriginalContext<TRef>(defaultValue as TRef);
  const useCustomContext = (): TRef => useContext<TRef>(context);
  return [context, useCustomContext];
}
