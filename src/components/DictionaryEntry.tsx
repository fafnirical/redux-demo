import React from 'react';
import { connect } from 'react-redux';

import { State } from '../state';
import { removeFromDictionary } from '../state/dictionary';

// Own props: Users of this component will only see <DictionaryEntry word={...} />
interface OwnProps {
  word: string;
}

// Props from the Redux store
interface StateProps {
  definition: string;
}

// Props from Redux dispatch
interface DispatchProps {
  onRemoveWord(): void;
}

// All the props merged together
interface DictionaryEntryProps extends OwnProps, StateProps, DispatchProps {}

const DictionaryEntry: React.SFC<DictionaryEntryProps> = ({ word, definition, onRemoveWord }) => {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = event => {
    event.preventDefault();
    onRemoveWord();
  }

  return (
    <p>
      {/* A crappy remove button to dispatch remove actions */}
      <a href="#" onClick={handleClick}>✘</a>
      {word}: {definition}
    </p>
  );
}

export default connect(
  // mapStateToProps: Look up the definition of the passed-in word
  ({ dictionary }: State, { word }: OwnProps): StateProps => ({
    definition: dictionary[word],
  }),
  // mapDispatchToProps: Removes this word from
  (dispatch, { word }): DispatchProps => ({
    // Binds dispatch to the action creator
    onRemoveWord() {
      dispatch(removeFromDictionary(word));
    },
  }),
)(DictionaryEntry);
