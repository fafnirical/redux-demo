import React from 'react';
import { connect } from 'react-redux';

import { State } from '../state';

import DictionaryEntry from './DictionaryEntry';

// No own props
interface OwnProps {}

// Retrieves the list of words from the store (see connect() call below)
interface StateProps {
  words: ReadonlyArray<string>;
}

// No dispatch props
interface DispatchProps {}

interface DictionaryProps extends OwnProps, StateProps, DispatchProps {}

const Dictionary: React.SFC<DictionaryProps> = ({ words }) => {
  return (
    <div>
      {words.map(word => (
        <DictionaryEntry key={word} word={word} />
      ))}
    </div>
  );
}

export default connect(
  // Get a list of words from the list of words in the dictionary
  ({ dictionary }: State): StateProps => {
    return {
      words: Object.keys(dictionary),
    };
  },
)(Dictionary);
