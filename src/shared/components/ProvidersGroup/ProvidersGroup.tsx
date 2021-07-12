import { createElement } from 'react';
import React, { cloneElement } from 'react';

export interface ProvidersGroupProps {
  providers: any;
}
const ProvidersGroup: React.FunctionComponent<ProvidersGroupProps> = (props) => {
  let { children } = props;

  /* Error - Validation */
  if (!props.providers) {
    throw 'ProvidersGroup: Missing providers props';
  }

  if (!Array.isArray(props.providers)) {
    throw 'ProvidersGroup: Must be a array';
  }

  if (!props.children) {
    throw 'ProvidersGroup: Missing children';
  }

  const hasProviders = props?.providers?.length;
  if (!hasProviders) {
    return <>{children}</>;
  }

  props.providers.forEach((provider: any) => {
    const providerElement = createElement(provider);
    children = cloneElement(providerElement, props, children);
  });

  return <>{children}</>;
};

export default ProvidersGroup;
