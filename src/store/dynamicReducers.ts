import { Action, AnyAction, combineReducers, Middleware, Reducer } from 'redux';
import { configureStore as rtkConfigureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { ThunkMiddlewareFor } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

export type BaseReducers = {
  [key: string | number | symbol]: Reducer;
};
export type ReducerManager = ReturnType<typeof createReducerManager>;

type Middlewares<S> = ReadonlyArray<Middleware<{}, S>>;
type ConfigureStoreOpts<
  TInitial extends BaseReducers = BaseReducers,
  S = any,
  A extends Action = AnyAction,
  M extends Middlewares<S> = [ThunkMiddlewareFor<S>],
> = Omit<ConfigureStoreOptions<S, A, M>, 'reducer'> & {
  initialReducers: TInitial;
};

/**
 * @author hunglq
 * @desc
 * - This function will generate and combine initial reducers and async reducers.
 * - And also it will return a object including properties to manage current reducers of App.
 * @link https://redux.js.org/usage/code-splitting
 */
export function createReducerManager<
  TInitial extends BaseReducers = BaseReducers,
  TAsync extends BaseReducers = BaseReducers,
>(initialReducers: TInitial) {
  type TCurrent = TInitial & TAsync;
  // Create an object which maps keys to reducers
  const reducers: TCurrent = { ...initialReducers } as TCurrent;

  // Create the initial combinedReducer
  let combinedReducers = combineReducers(reducers);

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove: (string | number | symbol)[] = [];

  return {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state: any, action: AnyAction) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        for (const key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      // Delegate to the combined reducer
      return combinedReducers(state, action);
    },

    // Adds a new reducer with the specified key
    add: (key: keyof TCurrent, reducer: TCurrent[keyof TCurrent]) => {
      if (!key || reducers[key]) {
        return;
      }
      // Add the reducer to the reducer mapping
      reducers[key] = reducer;

      // Generate a new combined reducer
      combinedReducers = combineReducers(reducers);
    },

    // Removes a reducer with the specified key
    remove: (key: keyof TCurrent) => {
      if (!key || !reducers[key]) {
        return;
      }

      // Remove it from the reducer mapping
      delete reducers[key];

      // Add the key to the list of keys to clean up
      keysToRemove.push(key);

      // Generate a new combined reducer
      combinedReducers = combineReducers(reducers);
    },
  };
}

/**
 * @author hunglq
 * @desc
 * - This function use to configure store like configureStore of redux-toolkit without `reducer` property and add more a `initialReducers` property.
 * - The reason for omitting `reducer` property because we will use reducerManager.reduce for `reducer` property when using configureStore of RTK.
 * @example
 * 
 * ```
 *  // Configure in store.ts
 *  // store.ts
 *  const initialReducers = {
      loading: loadingReducer,
      auth: authReducer,
    };

    type InitialReducersType = typeof initialReducers;
    type AsyncReducersType = {
      employee: EmployeeReducerType;
      sample: SampleReducerType;
      user: UserReducerType;
    };

    export const { store, reducerManager } = configureStore<InitialReducersType, AsyncReducersType>({ initialReducers });

    // Add reducers
    // features/Sample.tsx
    reducerManager.add('sample', sampleReducer);
 * ```
 */
export function configureStore<
  TInitial extends BaseReducers = BaseReducers,
  TAsync extends BaseReducers = BaseReducers,
>({ initialReducers, ...restOptions }: ConfigureStoreOpts<TInitial>) {
  const reducerManager = createReducerManager<TInitial, TAsync>(initialReducers);

  // Create a store with the root reducer function being the one exposed by the manager.
  const store = rtkConfigureStore({
    ...restOptions,
    reducer: reducerManager.reduce,
  });

  return { store, reducerManager };
}
