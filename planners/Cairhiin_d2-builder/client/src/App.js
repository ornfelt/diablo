import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import CoreLayout from './layouts/CoreLayout';
import './App.css';

class App extends Component {

render() {
    return (
      <Router history={this.props.history}>
        <CoreLayout />
      </Router>
    );
  }
}

export default App;
