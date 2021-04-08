import { createElement } from 'react';
import React, { cloneElement } from 'react';

export interface ProvidersFactoryProps {
  providers: any;
}
const ProvidersGroup: React.FunctionComponent<ProvidersFactoryProps> = (props) => {
  let children: any = props.children;

  /* Error - Validation */
  if (!props.providers) {
    throw 'ProvidersFactory: Missing providers prop';
  }

  if (!Array.isArray(props.providers)) {
    throw 'ProvidersFactory: Must be a array';
  }

  if (!props.children) {
    throw 'ProvidersFactory: Missing children';
  }

  const hasProviders = props?.providers?.length;
  if (!hasProviders) {
    return children;
  }

  props.providers.forEach((provider: any) => {
    const providerElement = createElement(provider);
    children = cloneElement(providerElement, props, children);
  });

  return children;
}

export default ProvidersGroup;
