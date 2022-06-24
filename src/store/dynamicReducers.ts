import { AnyAction, combineReducers, Reducer } from 'redux';
import { configureStore as rtkConfigureStore } from '@reduxjs/toolkit';

export type BaseReducers = {
  [key: string | number | symbol]: Reducer;
};
export type ReducerManager = ReturnType<typeof createReducerManager>;

export function createReducerManager<
  TStatic extends BaseReducers = BaseReducers,
  TAsync extends BaseReducers = BaseReducers,
>(initialReducers: TStatic) {
  type TCurrent = TStatic & TAsync;
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

export function configureStore<
  TStatic extends BaseReducers = BaseReducers,
  TAsync extends BaseReducers = BaseReducers,
>({ staticReducers }: { staticReducers: TStatic }) {
  const reducerManager = createReducerManager<TStatic, TAsync>(staticReducers);

  // Create a store with the root reducer function being the one exposed by the manager.
  const store = rtkConfigureStore({
    reducer: reducerManager.reduce,
  });

  return { store, reducerManager };
}
