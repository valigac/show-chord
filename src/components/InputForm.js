import React from 'react';

export default class InputForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'C major',
      mode: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.onInputChange(e.target.value, this.state.mode);
  }

  handleInversion(e) {
    this.setState({ mode: e });
    this.props.onInputChange(this.state.value, e);
  }

  render() {
    return (
      <div>
        <div id="search-bar">
          <h2>Chord symbol</h2>
          <p>Write name of a chord (for example <span className="highlight">A minor</span>)</p>
          <input type="text" id="search-input" value={this.state.value} onChange={this.handleChange} />
        </div>

        <div id="inversions">
          <span className={`inversion ${(this.state.mode == 0) ? 'active-choice' : ''}`} onClick={(e) => { this.handleInversion(0) }}>Root</span>
          <span className={`inversion ${(this.state.mode == 1) ? 'active-choice' : ''}`} onClick={(e) => { this.handleInversion(1) }}>First</span>
          <span className={`inversion ${(this.state.mode == 2) ? 'active-choice' : ''}`} onClick={(e) => { this.handleInversion(2) }}>Second</span>
        </div>

      </div>
    )
  }
}
