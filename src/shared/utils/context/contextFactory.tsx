/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext as createOriginalContext, PropsWithChildren, useContext } from 'react';

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

export interface CreateContextArgs<TRef = object, TProps = object> {
  defaultValue?: TRef;
  useProvider: (props: PropsWithChildren<TProps>) => TRef;
}

export function createContext<TRef extends object = object, TProps extends object = object>({
  defaultValue,
  useProvider,
}: CreateContextArgs<TRef, TProps>): [React.FunctionComponent<TProps>, () => TRef, React.Context<TRef>] {
  const Context = createOriginalContext<TRef>(defaultValue ?? ({} as TRef));
  const Provider: React.FunctionComponent<TProps> = (props) => {
    const instance = useProvider(props);
    return <Context.Provider value={instance}>{props.children}</Context.Provider>;
  };
  const useCustomContext = (): TRef => useContext<TRef>(Context);
  return [Provider, useCustomContext, Context];
}
