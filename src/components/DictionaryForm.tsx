import React from 'react';
import { connect } from 'react-redux';

// Import convenient action creator from the dictionary state
import { addToDictionary } from '../state/dictionary';

// "own" props (i.e., props not passed via react-redux)
interface OwnProps {}
// Props from the store
interface StateProps {}
// Props from dispatch
interface DispatchProps {
  onAddToDictionary(word: string, definition: string): void;
}

// The full set of props passed into this component
interface DictionaryFormProps extends OwnProps, StateProps, DispatchProps {}

interface DictionaryFormState {
  word: string;
  definition: string;
}

class DictionaryForm extends React.Component<DictionaryFormProps, DictionaryFormState> {
  constructor(props: DictionaryFormProps) {
    super(props);

    this.state = {
      word: '',
      definition: '',
    };
  }

  private handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const { word, definition } = this.state;

    if (word && definition) {
      // Update the dictionary in redux
      this.props.onAddToDictionary(word, definition);

      this.setState({
        word: '',
        definition: '',
      });
    }
  }

  private handleWordChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    this.setState({ word: event.target.value });
  }

  private handleDefinitionChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
    this.setState({ definition: event.target.value });
  }

  render() {
    const { word, definition } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label style={{ display: 'block' }}>
          Word: <input onChange={this.handleWordChange} value={word} />
        </label>

        <label style={{ display: 'block' }}>
          <textarea onChange={this.handleDefinitionChange} value={definition} />
        </label>

        <button>Add definition</button>
      </form>
    );
  }
}

export default connect(
  (): StateProps => ({}),
  (dispatch): DispatchProps => ({
    onAddToDictionary(word, definition) {
      dispatch(addToDictionary(word, definition));
    },
  }),
)(DictionaryForm);
