import { createStore, combineReducers, Store, Reducer } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

// Personal preference: define a reducer and state interface for each root key in the store
// (There are many ways to organize Redux-based apps, and they're all valid: it's mostly a matter of preference.)
import { dictionaryReducer, DictionaryState } from './dictionary';

/** The state managed by the Redux store. */
export interface State {
  dictionary: DictionaryState;
}

export default function configureStore(): Store<State> {
  return createStore<State>(
    combineReducers({
      // Not sure why this cast is needed -- might be a strictFunctionTypes issue?
      dictionary: dictionaryReducer as Reducer<DictionaryState>,
    }),
    // Wire redux up to the dev tools
    devToolsEnhancer({}),
  );
}
