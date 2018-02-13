// Your state can be any value: an object, a number, null, whatever. It just can't be `undefined'.
// (Redux uses that to detect potential bugs, much like React does with render()'s return value.)
export interface DictionaryState {
  readonly [key: string]: string;
}

// Adds a word with the given definition
interface AddToDictionaryAction {
  // NB. The string literal type here is important: see the reducer below
  readonly type: 'DICTIONARY_ADD';
  readonly word: string;
  readonly definition: string;
}

// Removes a word from the dictionary
interface RemoveFromDictionaryAction {
  readonly type: 'DICTIONARY_REMOVE';
  readonly word: string;
}

/** The type of actions that this reducer handles */
export type DictionaryAction = AddToDictionaryAction | RemoveFromDictionaryAction;

/*
 * The two functions below this line are typically called "action creators". Redux offers
 * bindCreators() which is probably pretty handy, but I haven't used it.
 */

/** Adds a word to the dictionary */
export function addToDictionary(word: string, definition: string): AddToDictionaryAction {
  return {
    type: 'DICTIONARY_ADD',
    word,
    definition,
  };
}

/** Removes a word from the dictionary */
export function removeFromDictionary(word: string): RemoveFromDictionaryAction {
  return {
    type: 'DICTIONARY_REMOVE',
    word,
  };
}

const defaultDictionary: DictionaryState = {
  'word 1': 'Nam blanditiis doloremque perspiciatis ducimus.',
  'word 2': 'Vel minus culpa dolorum eligendi recusandae aut exercitationem iure.',
  'word 3': 'Vel quasi et vitae.',
};


/*
 * Reducer shape notes:
 *
 * Reducers are designed to look and act like Array#reduce, so they have this signature:
 *   (state, action) => state.
 *
 * Redux's first action is to call this reducer with (undefined, @@INIT), where @@INIT is a special
 * "startup" action. Since redux doesn't allow us to return undefined from any reducer, we use this
 * opportunity to load in a default value of our choosing. In more advanced cases, we could instead
 * pass the default state into createStore() after retrieving it from local storage or a web API.
 */
export function dictionaryReducer(state: DictionaryState = defaultDictionary, action: DictionaryAction): DictionaryState {
  switch (action.type) {
    case 'DICTIONARY_ADD': {
      /*
       * By using string literals for our types, we can ensure that TypeScript is able to
       * discriminate between each variant automatically. Go aheed! Hover on 'action' inside the
       * switch statement, and hover on it here -- see how its type has been narrowed.
       */
      const { word, definition } = action;
      return {
        ...state,
        [word]: definition,
      };
    }

    case 'DICTIONARY_REMOVE': {
      const { word } = action;
      const { [word]: _definition, ...dictionary } = state;

      return dictionary;
    }

    default:
      // TypeScript doesn't think this case is actually possible, again -- we can't return undefined.
      return state;
  }
}
