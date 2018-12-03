import React from 'react';
import axios from 'axios';

import Budget from './budget.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      budgetName:'',
      budget: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    console.log(`Alert! You've selected visualize`);
  }

  render() {
    return (
      <div>
        <h1>Welcome to your time budget!</h1>
        <div id="username">
          <h2 >User: { this.state.user }</h2>
        </div>
        <div id="budgetName">
          {/* Confirm budgetName is established *prior* to loading page */}
          {/* It _may_ come through with the onMount call */}
          <h2>Budget: { this.state.budgetName }</h2>
        </div>
        {/* <div id="budget">
          <Budget
            budget = { this.state.budget }
          />
        </div> */}
        <button id="visualizeBudget" className="button" onClick={ this.handleClick }>Visualize</button>
      </div>
    );
  }
}

export default App;
