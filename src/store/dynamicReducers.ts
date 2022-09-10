/**
 * @link
 * https://medium.com/velotio-perspectives/the-ultimate-cheat-sheet-on-splitting-dynamic-redux-reducers-322ca17d5350
 * https://redux.js.org/usage/code-splitting
 */
import {
  Action,
  AnyAction,
  CombinedState,
  combineReducers,
  Dispatch,
  Middleware,
  Reducer,
  ReducersMapObject,
} from 'redux';
import { configureStore as rtkConfigureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { ThunkMiddlewareFor } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

// type Reducer<
//   S extends any = any,
//   A extends Action = AnyAction,
//   M extends Middlewares<S> = [ThunkMiddlewareFor<S>],
// > = ConfigureStoreOptions<S, A, M>['reducer'];

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
  S = any,
  A extends Action = AnyAction,
  // M extends Middlewares<S> = [ThunkMiddlewareFor<S>],
>(initialReducers: ReducersMapObject<S, A>) {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers } as ReducersMapObject<S, A>;

  // Create the initial combinedReducer
  let combinedReducers = combineReducers(reducers);

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove: (keyof S)[] = [];

  const reduce: Reducer<CombinedState<S>, A> = (state: CombinedState<S> | undefined, action: A) => {
    if (!state) return combinedReducers({} as CombinedState<S>, action);

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
  };

  return {
    reduce,
    // The root reducer function exposed by this object
    // This will be passed to the store
    getReducers: () => reducers,

    // Adds a new reducer with the specified key
    add(asyncReducers: Partial<ReducersMapObject<S, A>>, dispatch: Dispatch) {
      const keys = Object.keys(asyncReducers) as (keyof S)[];

      let hasChanged = false;

      keys.forEach((key) => {
        if (asyncReducers[key] && !reducers[key]) {
          hasChanged = true;
          reducers[key] = asyncReducers[key] as ReducersMapObject<S, A>[keyof S];
        }
      });

      if (!hasChanged) return;
      // Add the reducer to the reducer mapping

      // Generate a new combined reducer
      combinedReducers = combineReducers(reducers);
      dispatch({ type: '@@dynamicReducers/adding' }); // dispatch a action to update the latest reducers
    },

    // Removes a reducer with the specified key
    remove: (keys: (keyof S)[], dispatch: Dispatch) => {
      if (!keys.length) {
        return;
      }

      // Remove it from the reducer mapping
      keys.forEach((key) => {
        delete reducers[key];

        // Add the key to the list of keys to clean up state as well.
        keysToRemove.push(key);
      });

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
    withDynamicReducer(SampleRouting, { name: 'sample', reducer: sampleReducer, clearWhenUnmount: true });

    // sampleSlice.ts
    const sampleSlice = createSlice({...})
    export type SampleReducerType = typeof sampleSlice.reducer
 * ```
 */
export function configureStore<
  S extends any = any,
  A extends Action = AnyAction,
  M extends Middlewares<CombinedState<S>> = [ThunkMiddlewareFor<CombinedState<S>>],
>({ initialReducers, ...rest }: ConfigureStoreOpts<CombinedState<S>, A, M>) {
  const reducerManager = createReducerManager(initialReducers);

  // Create a store with the root reducer function being the one exposed by the manager.
  const store = rtkConfigureStore({
    ...rest,
    reducer: reducerManager.reduce,
  });

  return { store, reducerManager };
}
