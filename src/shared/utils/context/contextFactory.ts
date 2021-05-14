import { upperFirst } from 'lodash';
import { createContext as createOriginalContext, useContext } from 'react';

type MappingContextFactoryRef<Type, TName extends string = ''> = {
  [Property in keyof Type as Property extends 'useContext'
    ? `use${Capitalize<string &TName>}Context`
    : `${Capitalize<string &TName>}${Capitalize<string & Property>}`]: Type[Property];
};

export interface CreateContextArgs<TName, TRef> {
  displayName: TName;
  defaultValue: TRef;
  providerComponent: (currentContext: React.Context<TRef>) => React.FunctionComponent,
}

export interface ContextFactoryRef<TRef extends unknown = unknown> {
  context: React.Context<TRef>;
  provider: React.FunctionComponent;
  useContext: () => TRef;
}

export function createContext<TName extends string, TRef extends unknown = unknown>({
  displayName,
  defaultValue,
  providerComponent,
}: CreateContextArgs<TName, TRef>): MappingContextFactoryRef<ContextFactoryRef<TRef>, TName> {
  if (!displayName) {
    throw Error('You have to declare the displayName');
  }

  const context = createOriginalContext<TRef>(defaultValue);
  const provider = providerComponent(context);
  const useCustomContext = (): TRef => useContext<TRef>(context);

  return {
    [`${upperFirst(displayName)}Context`]: context,
    [`${upperFirst(displayName)}Provider`]: provider,
    [`use${upperFirst(displayName)}Context`]: useCustomContext,
  } as MappingContextFactoryRef<ContextFactoryRef<TRef>, TName>;
}
