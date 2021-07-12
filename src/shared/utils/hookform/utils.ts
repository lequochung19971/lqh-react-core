import { useState } from "react";

/**
 * @decs Function that implements to flatten object by recursion.
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
 * @decs Function that flatten object.
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
 * @decs Function hook in order to force re-render function component
 * @author   hungle
 */
export const useForceRender = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

/**
 * @decs Function that check current htmlRef is existed in DOM.
 * @author   hungle
 * @param    {HTMLElement}  elementRef  Object
 * @returns  {boolean}  is existed or not 
 */
export const isLiveInDOM = (elementRef: HTMLElement | any): boolean => {
  return elementRef instanceof HTMLElement && document.contains(elementRef);
}