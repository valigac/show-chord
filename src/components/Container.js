import React from 'react';
import InputForm from './InputForm.js';
import Piano from './Piano.js';

export default class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chord: null,
      type: 'major'
    };
  }

  handleInputChange(input) {
    console.log(input);
  }

  render() {
    return(
      <div id="chord-container">
        <InputForm onInputChange={this.handleInputChange} />
        <Piano selected={[ 'C0', 'E0', 'G0' ]} />
      </div>
    );
  }
}
