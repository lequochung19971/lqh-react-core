import React, { PropsWithChildren } from 'react';

/**
 * @desc This HOC is used to generate a Provider Component with Props (just using if Provider Component need Props)
 * @author hungle
 * @param {(React.FunctionComponent<TProps> | TComponent)}  ProviderComponent Provider Component
 * @param {TProps} providerProps Props of Component that you want to pass into Provider Component
 * @returns {React.FunctionComponent<object>}
 */

export const withProvider = <TProps extends unknown>(
  ProviderComponent: React.ComponentType<TProps>,
  providerProps = { children: undefined } as PropsWithChildren<TProps>,
) => {
  const ProviderItem: React.FunctionComponent = (props) => (
    <ProviderComponent {...providerProps}>{props.children}</ProviderComponent>
  );
  return ProviderItem;
};
