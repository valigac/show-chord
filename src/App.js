import React from 'react';
import Container from './components/Container.js';
import { hot } from 'react-hot-loader';

class App extends React.Component {
  render() {
    return(
      <div>
        <Container />
      </div>
    );
  }
}

export default hot(module)(App);
