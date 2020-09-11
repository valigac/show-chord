import React from 'react';

export default class Piano extends React.Component {
  render() {
    return(
      <div id="keyboard">
        <div className="octave">
            <span className={`white-keys ${this.props.selected.includes('C0') ? 'active-white' : ''}`}></span>
            <span className={`black-keys ${this.props.selected.includes('C#0') ? 'active-black' : ''}`}></span>
            <span className={`white-keys ${this.props.selected.includes('D0') ? 'active-white' : ''}`}></span>
            <span className={`black-keys ${this.props.selected.includes('D#0') ? 'active-black' : ''}`}></span>
            <span className={`white-keys ${this.props.selected.includes('E0') ? 'active-white' : ''}`}></span>
            <span className={`white-keys ${this.props.selected.includes('F0') ? 'active-white' : ''}`}></span>
            <span className={`black-keys ${this.props.selected.includes('F#0') ? 'active-black' : ''}`}></span>
            <span className={`white-keys ${this.props.selected.includes('G0') ? 'active-white' : ''}`}></span>
            <span className={`black-keys ${this.props.selected.includes('G#0') ? 'active-black' : ''}`}></span>
            <span className={`white-keys ${this.props.selected.includes('A0') ? 'active-white' : ''}`}></span>
            <span className={`black-keys ${this.props.selected.includes('A#0') ? 'active-black' : ''}`}></span>
            <span className={`white-keys ${this.props.selected.includes('B0') ? 'active-white' : ''}`}></span>
          </div>
          <div className="octave">
          <span className={`white-keys ${this.props.selected.includes('C1') ? 'active-white' : ''}`}></span>
          <span className={`black-keys ${this.props.selected.includes('C#1') ? 'active-black' : ''}`}></span>
          <span className={`white-keys ${this.props.selected.includes('D1') ? 'active-white' : ''}`}></span>
          <span className={`black-keys ${this.props.selected.includes('D#1') ? 'active-black' : ''}`}></span>
          <span className={`white-keys ${this.props.selected.includes('E1') ? 'active-white' : ''}`}></span>
          <span className={`white-keys ${this.props.selected.includes('F1') ? 'active-white' : ''}`}></span>
          <span className={`black-keys ${this.props.selected.includes('F#1') ? 'active-black' : ''}`}></span>
          <span className={`white-keys ${this.props.selected.includes('G1') ? 'active-white' : ''}`}></span>
          <span className={`black-keys ${this.props.selected.includes('G#1') ? 'active-black' : ''}`}></span>
          <span className={`white-keys ${this.props.selected.includes('A1') ? 'active-white' : ''}`}></span>
          <span className={`black-keys ${this.props.selected.includes('A#1') ? 'active-black' : ''}`}></span>
          <span className={`white-keys ${this.props.selected.includes('B1') ? 'active-white' : ''}`}></span>
          </div>
      </div>
    );
  }
}
