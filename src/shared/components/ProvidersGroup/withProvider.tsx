import React, { Component } from 'react';

/**
 * @desc This HOC is used to generate a Provider Component with Props (just using if Provider Component need Props)
 * @author hungle
 * @param {(React.FunctionComponent<TProps> | TComponent)}  ProviderComponent Provider Component
 * @param {TProps} providerProps Props of Component that you want to pass into Provider Component
 * @returns {React.FunctionComponent<object>}
 */
export const withProvider = <TProps extends object, TComponent extends typeof Component>(
  ProviderComponent: React.FunctionComponent<TProps> | TComponent,
  providerProps: TProps,
): React.FunctionComponent<{}> => {
  const ProviderItem: React.FunctionComponent = (props) => {
    return <ProviderComponent {...(providerProps ?? ({} as TProps))}>{props.children}</ProviderComponent>;
  };
  return ProviderItem;
};