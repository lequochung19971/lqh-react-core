/**
 * @link
 * https://medium.com/velotio-perspectives/the-ultimate-cheat-sheet-on-splitting-dynamic-redux-reducers-322ca17d5350
 * https://redux.js.org/usage/code-splitting
 */
import { Action, AnyAction, combineReducers, Dispatch, Middleware, ReducersMapObject } from 'redux';
import { configureStore as rtkConfigureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { ThunkMiddlewareFor } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

export type BaseReducers<S extends any = any> = {
  [key: string | number | symbol]: Reducer<S>;
};
export type ReducerManager = ReturnType<typeof createReducerManager>;

type Reducer<
  S extends any = any,
  A extends Action = AnyAction,
  M extends Middlewares<S> = [ThunkMiddlewareFor<S>],
> = ConfigureStoreOptions<S, A, M>['reducer'];

type Middlewares<S> = ReadonlyArray<Middleware<{}, S>>;
type ConfigureStoreOpts<
  S extends any = any,
  A extends Action = AnyAction,
  M extends Middlewares<S> = [ThunkMiddlewareFor<S>],
> = {
  initialReducers: ReducersMapObject<S, A>;
} & Omit<ConfigureStoreOptions<S, A, M>, 'reducer'>;

/**
 * @author hunglq
 * @desc
 * - This function will generate and combine initial reducers and async reducers.
 * - And also it will return a object including properties to manage current reducers of App.
 */
export function createReducerManager<
  S extends any = any,
  A extends Action = AnyAction,
  M extends Middlewares<S> = [ThunkMiddlewareFor<S>],
>(initialReducers: ReducersMapObject<S, A>) {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers } as ReducersMapObject<S, A>;

  // Create the initial combinedReducer
  let combinedReducers = combineReducers(reducers);

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove: (string | number | symbol)[] = [];

  return {
    getReducers: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state: any, action: A) => {
      // If any reducers have been removed, clean up their state first
      state = { ...state };
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
    add: (
      key: keyof ReducersMapObject<S, A>,
      reducer: ReducersMapObject<S, A>[keyof ReducersMapObject<S, A>],
      dispatch: Dispatch,
    ) => {
      console.log('Add', key, reducer);
      if (!key || reducers[key]) {
        return;
      }
      // Add the reducer to the reducer mapping
      reducers[key] = reducer;

      // Generate a new combined reducer
      combinedReducers = combineReducers(reducers);
      dispatch({ type: '@@dynamicReducers/adding' }); // dispatch a action to update the latest reducers
    },

    // Removes a reducer with the specified key
    remove: (key: keyof Reducer<S, A, M>, dispatch: Dispatch) => {
      if (!key || !reducers[key]) {
        return;
      }

      // Remove it from the reducer mapping
      delete reducers[key];

      // Add the key to the list of keys to clean up
      keysToRemove.push(key);

      // Generate a new combined reducer
      combinedReducers = combineReducers(reducers);
      dispatch({ type: '@@dynamicReducers/removing' }); // dispatch a action to update the latest reducers
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

    type CurrentReducersType = typeof initialReducers & AsyncReducersType;

    export const { store, reducerManager } = configureStore({ initialReducers } as { initialReducers: CurrentReducersType; }); 
    // Should as `{ initialReducers: CurrentReducersType; } to automatically map types for State.`
    // Add reducers
    // features/Sample.tsx
    reducerManager.add('sample', sampleReducer, store.dispatch);

    // sampleSlice.ts
    const sampleSlice = createSlice({...})
    export type SampleReducerType = typeof sampleSlice.reducer
 * ```
 */
export function configureStore<
  S extends any = any,
  A extends Action = AnyAction,
  M extends Middlewares<S> = [ThunkMiddlewareFor<S>],
>({ initialReducers }: ConfigureStoreOpts<S, A, M>) {
  const reducerManager = createReducerManager(initialReducers);

  // Create a store with the root reducer function being the one exposed by the manager.
  const store = rtkConfigureStore({
    reducer: reducerManager.reduce,
  });

  return { store, reducerManager };
}
