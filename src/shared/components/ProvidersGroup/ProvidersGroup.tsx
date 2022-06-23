import { createElement } from 'react';
import React, { cloneElement } from 'react';

export interface ProvidersGroupProps {
  providers: React.ComponentType[];
}
const ProvidersGroup: React.FunctionComponent<ProvidersGroupProps> = (props) => {
  const { children } = props;

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

  const res = props.providers.reduceRight((prev, currentProvider: React.ComponentType) => {
    const providerElement = createElement(currentProvider);
    return cloneElement(providerElement, props, prev);
  }, children);

  return <>{res}</>;
};

export default ProvidersGroup;
