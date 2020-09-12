import React from 'react';
import InputForm from './InputForm.js';
import Piano from './Piano.js';

import { getScales, isChord, getInterval } from '../lib/music.js';

export default class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: [ 'C0', 'E0', 'G0' ]
    };
    this.scales = getScales();
    this.handleInputChange = this.handleInputChange.bind(this);
    console.log(this.scales);
  }

  handleInputChange(input, mode) {
    if (isChord(input)) {
      console.log(this.scales);
      let intervals = getInterval(input, this.scales, mode);
      console.log(intervals);
      this.setState({ selected: intervals });
    }
  }

  render() {
    return(
      <div id="chord-container">
        <InputForm onInputChange={this.handleInputChange} />
        <Piano selected={this.state.selected} />
      </div>
    );
  }
}
