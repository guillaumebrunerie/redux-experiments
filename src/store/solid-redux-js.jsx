import * as React from "react";
import { createEffect, createRoot, untrack } from "solid-js";
import { createStore, produce } from "solid-js/store";

// I’m kind of abusing `createReducer` here in that it doesn’t actually create a
// reducer but simply collects the reducers and the initial state
export const createReducer = (initialState, builderCallback) => {
  const reducers = {};
  const builder = {
    addCase: (actionCreator, reducer) => {
      reducers[actionCreator.type] = reducer;
      return builder;
    },
  };
  builderCallback(builder);
  return {
    initialState,
    reducers,
  };
};

// `configureStore` does not take a reducer as an argument, but takes whatever
// is returned by `createReducer`
export const configureStore = ({ reducer: { initialState, reducers } }) => {
  // `createStore` comes from Solid, it wraps the state into a proxy so that
  // it will be able to track which parts are accessed by selectors
  const [state, setState] = createStore(initialState);
  const getState = () => state;
  // `dispatch` simply uses Solid’s `produce` function, which is inspired by
  // Immer. The function contains mutating logic, with the proxy keeping track
  // of what changed.
  const dispatch = (action) => {
    setState(
      produce((state) => {
        reducers[action.type](state, action);
      }),
    );
  };
  const store = { getState, dispatch };
  return store;
};

const StoreContext = React.createContext(null);
export const Provider = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useDispatch = () => {
  const store = React.useContext(StoreContext);
  return store.dispatch;
};

export const useSelector = (selector) => {
  const store = React.useContext(StoreContext);
  const state = store.getState();
  // When running for the first time, we call the selector on the state, but
  // it does not need to be tracked by Solid as we do it later in the effect
  const [selectedValue, setSelectedValue] = React.useState(() =>
    untrack(() => selector(state)),
  );
  React.useEffect(() => {
    // A root is used to make sure the Solid effect gets cleaned up properly
    return createRoot((dispose) => {
      let disposed = false;
      // `createEffect` comes from Solid, the given callback will
      // automatically detect which parts of `state` are used by
      // `selector(state)` and rerun if one of them changes. In particular
      // it will automatically update the React state when needed.
      createEffect(() => {
        try {
          setSelectedValue(selector(state));
        } catch (e) {
          // Similar trick as in React-Redux to deal with zombie
          // children, if it throws an error it might be because of
          // zombie children, so just try again a bit later
          setTimeout(() => {
            if (!disposed) {
              setSelectedValue(selector(state));
            }
          });
        }
      });
      return () => {
        disposed = true;
        dispose();
      };
    });
  }, [state]);
  return selectedValue;
};
