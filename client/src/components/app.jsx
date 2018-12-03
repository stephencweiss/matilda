import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      budgetName:'',
    };
  }

  render() {
    return (
      <div>
      <h1>Welcome to your time budget!</h1>
      <div id="username">
        <h2 >User: {this.state.user}</h2>
      </div>
      <div id="budgetName">
        <h2>Budget: {this.state.budgetName}</h2>
      </div>
      </div>
    );
  }
}

export default App;
