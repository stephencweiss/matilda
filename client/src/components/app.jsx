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
    this.fetchBudgetData = this.fetchBudgetData.bind(this);
    this.addBudgetItem = this.addBudgetItem.bind(this);
  }

  handleClick (event) {
    console.log(`Alert! You've selected visualize`);
  }

  addBudgetItem () {
    console.log(`Create a pop up form -- ask for category and hours allocated`);
    console.log('Mocking data on server for now');
  }

  fetchBudgetData (budgetId) {
    console.log(`Fetch the budgetId --> `, budgetId);
    const instance = axios.create({ baseURL: `http://localhost:8080` });
    instance.get(`/myBudget/data/${budgetId}`)
      .then( (response) => {
        console.log(`The response.data from the server is --> \n`)
        console.log(response.data)
        this.setState({budget: response.data})
      })
      .catch( (error) => { console.log(`There was an error with the Axios GET --> `, error) })
  }

  componentDidMount() {
    const url = window.location.href.split('/');
    console.log(`The URL is --> `, url);
    let budgetId = Number(url[url.length -1]);
    if (!isNaN(budgetId)) {
      this.fetchBudgetData(budgetId);
    } else {
      console.log(`No Budget to fetch`)
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to your time budget!</h1>
        <div id="username">
          <h2 >User: { this.state.user }</h2>
        </div>
        <div id="budget-name">
          {/* Confirm budgetName is established *prior* to loading page */}
          {/* It _may_ come through with the onMount call */}
          <h2>Budget: { this.state.budgetName }</h2>
        </div>
        <div id="budget">
          <Budget
            budget = { this.state.budget }
            addBudgetItem = { this.state.addBudgetItem }
          />
        </div>
        <div>
          <button id="visualize-budget" className="button" onClick={ this.handleClick }>Visualize</button>
        </div>
      </div>
    );
  }
}

export default App;
