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
      budgetId: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.fetchBudgetData = this.fetchBudgetData.bind(this);
    this.addBudgetCategory = this.addBudgetCategory.bind(this);
    
    //For dev purposes only
    this.mockData = this.mockData.bind(this);
  }

  handleClick (event) {
    console.log(`Alert! You've selected visualize`);
  }

  //For dev purposes only
  mockData () { return (
    {
      category: String('Test').concat(`_${Math.random()}`),
      hoursAllocated: String(Math.random()*10),
      budgetId: this.state.budgetId,
    })
  }

  addBudgetCategory (event) {
    console.log(`Create a pop up form -- ask for category and hours allocated`);
    
    console.log(`Post a new Budget Line Item for our existing Budget`)
    const instance = axios.create({ baseURL: 'http://localhost:8080' })
    instance.post(`/newBudgetItem/${this.state.budgetId}`, this.mockData())
      .then( (response) => {
        console.log('The response data from the server is --> \n', response.data)
        this.fetchBudgetData(this.state.budgetId)
      })
      .catch( (error) => { console.log(`There was an error with the Axios POST --> `, error) })
  }

  fetchBudgetData (budgetId) {
    console.log(`Fetch the budgetId --> `, budgetId);
    const instance = axios.create({ baseURL: `http://localhost:8080` });
    instance.get(`/myBudget/data/${budgetId}`)
      .then( (response) => {
        console.log(`The response.data from the server is --> \n`, response.data)
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
      this.setState({ budgetId: budgetId})
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
          <h2>Budget: { this.state.budgetName }</h2>
        </div>
        <div id="budget">
          <Budget
            budget = { this.state.budget }
            addBudgetCategory = { this.addBudgetCategory }
          />
        </div>
        <div>
          {/* <button id="add-budget-item" className="button" onClick={ this.addBudgetCategory }>Add_Budget</button> */}
          <button id="visualize-budget" className="button" onClick={ this.handleClick }>Visualize</button>
        </div>
      </div>
    );
  }
}

export default App;
