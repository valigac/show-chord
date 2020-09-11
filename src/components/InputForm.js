import React from 'react';

export default class InputForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.onInputChange(e.target.value);
  }

  render() {
    return (
      <div>
        <div id="search-bar">
          <h2>Chord symbol</h2>
          <p>Write name of a chord (for example <span className="highlight">A minor</span>) and press enter.</p>
          <input type="text" id="search-input" onChange={this.handleChange} />
        </div>

        <div id="inversions">
          <span className="inversion active-choice">Root</span>
          <span className="inversion">First</span>
          <span className="inversion">Second</span>
        </div>

      </div>
    )
  }
}
