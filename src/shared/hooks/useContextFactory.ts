import { upperFirst } from 'lodash';
import { createContext, useContext } from 'react';

type MappingContextFactoryRef<Type, TName extends string = ''> = {
  [Property in keyof Type as Property extends 'useContext'
    ? `use${Capitalize<string &TName>}Context`
    : `${Capitalize<string &TName>}${Capitalize<string & Property>}`]: () => Type[Property];
};

export interface useContextFactoryRef<TRef extends unknown = unknown> {
  context: React.Context<TRef>;
  provider: React.FunctionComponent;
  useContext: () => TRef;
}

export function useContextFactory<TName extends string, TRef extends unknown = unknown>(
  displayName: TName,
  defaultValue: TRef,
  fn: (currentContext: React.Context<TRef>) => React.FunctionComponent,
): MappingContextFactoryRef<useContextFactoryRef<TRef>, TName> {
  if (!displayName) {
    throw Error('You have to declare the displayName');
  }
  const context = createContext<TRef>(defaultValue);
  const provider = fn(context);
  const useCustomContext = (): TRef => useContext<TRef>(context);
  return {
    [`${upperFirst(displayName)}Context`]: context,
    [`${upperFirst(displayName)}Provider`]: provider,
    [`use${upperFirst(displayName)}Context`]: useCustomContext,
  };
}
