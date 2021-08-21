/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext as createOriginalContext, useContext } from 'react';

// type MappingContextFactoryRef<Type, TName extends string = ''> = {
//   [Property in keyof Type as Property extends 'useContext'
//     ? `use${TName}Context`
//     : `${TName}${Capitalize<string & Property>}`]: Type[Property];
// };

// export interface ContextFactoryRef<TRef extends object = object> {
//   context: React.Context<TRef>;
//   provider: React.FunctionComponent;
//   useContext: () => TRef;
// }

export function createContext<TRef extends object = object>(defaultValue: TRef): [React.Context<TRef>, () => TRef] {
  const context = createOriginalContext<TRef>(defaultValue as TRef);
  const useCustomContext = (): TRef => useContext<TRef>(context);
  return [context, useCustomContext];
}
