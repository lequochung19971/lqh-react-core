import React, { Component } from 'react';

/**
 * @desc This HOC is used to generate a Provider Component with Props (just using if Provider Component need Props)
 * @author hungle
 * @param {(React.FunctionComponent<TProps> | TComponent)}  ComponentProvider
 * @param {TProps} providerProps
 * @returns {React.FunctionComponent<object>}
 */
export const withProvider = <TProps extends object, TComponent extends typeof Component>(
  ComponentProvider: React.FunctionComponent<TProps> | TComponent,
  providerProps: TProps,
): React.FunctionComponent<{}> => {
  const Provider: React.FunctionComponent = (props) => {
    return <ComponentProvider {...(providerProps ?? ({} as TProps))}>{props.children}</ComponentProvider>;
  };

  return Provider;
};