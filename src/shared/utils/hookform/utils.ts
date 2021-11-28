import { get } from 'lodash';
import { useState } from 'react';
import { FieldRefs } from 'react-hook-form';

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
export const flattenObject = (obj: unknown): string[] => {
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
};

/**
 * @decs Function that check current htmlRef is existed in DOM.
 * @author   hungle
 * @param    {HTMLElement}  elementRef  Object
 * @returns  {boolean}  is existed or not
 */
export const isLiveInDOM = (elementRef: HTMLElement | any): boolean => {
  return elementRef instanceof HTMLElement && document.contains(elementRef);
};

/**
 * @desc  Function that use recursion to traverse and collect fields name that be saved in formRef.control.fieldsRef
 * @author  hungle
 * @param {Partial<Record<string, Field>>}  fieldsRef
 * @param {string[]}  target  An array to save collected fieldsName
 */
const traverseAndCollectFieldName = (currentFieldsRef: FieldRefs, target: string[]) => {
  for (const key in currentFieldsRef) {
    if (currentFieldsRef.hasOwnProperty(key)) {
      const value: any = currentFieldsRef[key];
      if (key === '_f') {
        const fieldName: string = get(value, 'name') as string;
        target.push(fieldName);
      } else {
        traverseAndCollectFieldName(value, target);
      }
    }
  }
};

/**
 * @desc  Function that gets fields name that be saved in formRef.control.fieldsRef
 * @author  hungle
 * @param {React.MutableRefObject<Partial<Record<string, Field>>>}  fieldsRef
 * @returns {string[]}  Returns a list of fields name
 */
export const getFieldsNameFromFieldsRef = (
  fieldsRef: FieldRefs,
): string[] => {
  const fieldsName: string[] = [];
  traverseAndCollectFieldName(fieldsRef, fieldsName);
  return fieldsName;
};

/**
 * @desc
 * - Function is a iterator to check and find that the current element is a field element or having a field element inside.
 * - Field element: (input, textarea, select, ...)
 * @author  hungle
 * @param {HTMLElement} elementRef Current html element
 * @param {void} callback Function to do something (set readonly or disabled) if current element is a field element or having a field element inside.
 */
export const forEachFieldElement = (
  elementRef: HTMLElement,
  callback: (elementRef: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, elementName: string) => void,
) => {
  if (!isLiveInDOM(elementRef)) return;

  type FieldElementName = 'input' | 'textarea' | 'select';
  const fieldElementNames: FieldElementName[] = ['input', 'textarea', 'select'];
  const tagName = elementRef.tagName.toLowerCase() as FieldElementName;

  /**
   * To check that the current element is a field element or not.
   *  + If true, do callback
   *  + If false, continue to check inside current element and do callback.
   */
  const isFieldElement = fieldElementNames.includes(tagName);
  if (isFieldElement) {
    callback(elementRef as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, tagName);
  } else {
    for (const elementName of fieldElementNames) {
      const childElementRef = elementRef.querySelector(elementName);
      if (childElementRef && isLiveInDOM(childElementRef)) {
        callback(childElementRef, elementName);
      }
    }
  }
};

/**
 * @desc  Function that gets current html element which is saved in formRef.control.fieldsRef
 * @author  hungle
 * @param {React.MutableRefObject<Partial<Record<string, Field>>>}  fieldsRef
 * @param {string}  fieldName
 * @returns {HTMLElement} Returns a html element
 */
export const getCurrentHTMLElementRef = (
  fieldsRef: FieldRefs,
  fieldName: string,
): HTMLElement => {
  const pathRef = `${fieldName}._f.ref`;
  const ref: HTMLElement = get(fieldsRef.current, pathRef) as unknown as HTMLElement;
  return ref;
};
