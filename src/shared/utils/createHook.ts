import { useRef } from 'react';

export type HookProps = Object;
export type CallbackHook<I extends {} = {}, P extends HookProps = HookProps> = (instance: I, props: P) => void;
export type FnHook<I extends {} = {}, P extends HookProps = HookProps> = (props: P) => I;

/**
 * @author hunglq
 * @desc This function is used to create a hook has `extends` feature like `class`.
 * @param {CallbackHook} currentHook the current hook that you want to create
 * @param {FnHook} extendedHook the hook that you want to extend
 * @returns {(props: {}) => {}} A hook function with props.
 * @example
 * ```
  type UseHookAInstance = { test: Function };
  const useHookA = createHook<UseHookAInstance>((instance, props) => {
    instance.test = () => {
      console.log('Test');
    };
  });

  type UseHookBInstance = { test2: Function } & UseHookAInstance;
  const useHookB = createHook<UseHookBInstance, { value?: string }>((instance, props) => {
    instance.test2 = () => {
      console.log('Test2');
    };

    // override
    instance.test = () => {
      console.log('useHookB - Test');
    };
  }, useHookA);

  type UseHookCInstance = { test3: Function } & UseHookBInstance;
  const useHookC = createHook<UseHookCInstance, { value?: string }>((instance, props) => {
    instance.test3 = () => {
      console.log('Test3');
    };

    // override
    instance.test2 = () => {
      console.log('useHookC - Test2');
    };

    // override
    instance.test = () => {
      console.log('useHookC - Test');
    };
  }, useHookB);
 * ```
 */
const createHook = function <I1 extends {} = {}, P extends HookProps = HookProps, I2 extends {} = {}>(
  currentHook: CallbackHook<typeof extendedHook extends undefined ? I1 : I1 & I2, P>,
  extendedHook?: FnHook<I2, P>,
) {
  return (props: P) => {
    type I = typeof extendedHook extends undefined ? I1 : I1 & I2;
    let instance: I = useRef({}).current as I;
    if (extendedHook) {
      instance = extendedHook(props) as I;
    }
    currentHook(instance, props);
    return instance;
  };
};

export default createHook;
