import { difference } from "lodash";
import { useState } from "react";

/**
 * Function that implements to flatten object by recursion.
 * @author   hungle
 * @param    {any}  currentNode  Current Object
 * @param    {string[]}  target  Flattened Result
 * @param    {string | undefined}  flattenedKey  Flattened Key
 */
const traverseAndFlatten = (currentNode: any, target: string[], flattenedKey?: string | undefined) => {
  for (const key in currentNode) {
    if (currentNode.hasOwnProperty(key)) {
      let newKey;
      if (flattenedKey === undefined) {
        newKey = key;
      } else {
        newKey = flattenedKey + '.' + key;
      }

      const value = currentNode[key];
      if (typeof value === 'object') {
        traverseAndFlatten(value, target, newKey);
      } else {
        target.push(newKey);
      }
    }
  }
};

/**
 * Function that flatten object.
 * @author   hungle
 * @param    {unknown}  obj  Object
 * @returns  {string[]}  Object keys
 */
export const flattenObj = (obj: unknown): string[] => {
  const flattenedObject: string[] = [];
  traverseAndFlatten(obj, flattenedObject);
  return flattenedObject;
};

export const clearObjectKeepReference = (obj: any): void => {
  for (const variableKey in obj) {
    if (obj.hasOwnProperty(variableKey)) {
      delete obj[variableKey];
    }
  }
};

/**
 * Function hook in order to force re-render function component
 * @author   hungle
 */
export const useForceRender = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

/**
 * Function that check change current fields of hook-form by comparing diference between current and new.
 * @author   hungle
 * @param    {string[]}  currentFieldNames  Object
 * @param    {string[]}  newFieldNames  Object
 * @returns  {boolean}  is changed or not 
 */
export const isFieldsRefChanged = (currentFieldNames: string[], newFieldNames: string[]): boolean => {
  const diff1 = difference(newFieldNames, currentFieldNames);
  const diff2 = difference(currentFieldNames, newFieldNames);
  return !!(diff1.length || diff2.length);
}

/**
 * Function that check current htmlRef is existed in DOM.
 * @author   hungle
 * @param    {HTMLElement}  elementRef  Object
 * @returns  {boolean}  is existed or not 
 */
export const isLiveInDOM = (elementRef: HTMLElement | any): boolean => {
  return elementRef instanceof HTMLElement && document.contains(elementRef);
}