import React from 'react';
import InputForm from './InputForm.js';
import Piano from './Piano.js';

import { getScales, isChord, getInterval } from '../lib/music.js';

export default class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: [ 'C0', 'E0', 'G0' ],
      chord: 'C major',
      mode: 0,
    };
    this.scales = getScales();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(input, mode) {
    if (isChord(input)) {
      let intervals = getInterval(input, this.scales, mode);
      this.setState({ selected: intervals });
    }
    this.setState({ chord: input, mode: mode });
  }

  render() {
    // <InputForm onInputChange={this.handleInputChange} inversions={this.state.selected.length} mode={this.state.mode} value={this.state.value} />
    // <Piano selected={this.state.selected} />
    return(
      <div id="chord-container">
        <InputForm onInputChange={this.handleInputChange} inversions={this.state.selected.length} mode={this.state.mode} chord={this.state.chord} />
        <Piano selected={this.state.selected} />
      </div>
    );
  }
}
