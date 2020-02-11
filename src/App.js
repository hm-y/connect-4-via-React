import React, { Component } from 'react';
import Game from './Components/Game';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Cognite Interview Submission</h1>
          <h2 className="App-subtitle">Connect Four by Hilmi Murat Yildirim</h2>
        </header>

        <div id="Main">
          <Game />
        </div>

      </div>
    );
  }
}

export default App;
