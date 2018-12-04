import React from 'react';
import axios from 'axios';

import Budget from './budget.jsx';
import BudgetCategoryForm from './budgetCategoryForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      budgetName:'',
      budget: [],
      budgetId: '',
    };
    this.addBudgetCategory = this.addBudgetCategory.bind(this);
    this.editLineItem = this.editLineItem.bind(this);
    this.deleteLineItem = this.deleteLineItem.bind(this);
    this.categoryForm = this.categoryForm.bind(this);
    this.budgetItemForm = this.budgetItemForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
    this.fetchBudgetData = this.fetchBudgetData.bind(this);
    //For dev purposes only
    this.mockData = this.mockData.bind(this);
  }

  handleClick (event) {
    console.log(`Alert! You've selected visualize; Details on event -->`, event.target);
    if (event.target.className === "visualize-budget") {
      console.log(`Let's visualize`)
    }
    if (event.target.className === "add-budget-category") {
      console.log(`Let's add a budget category`)
      this.categoryForm()
    }
    if (event.target.className === "edit-budget-line") {
      console.log(`Let's edit a budget line`)
      this.budgetItemForm(arguments[1])
    }
    if (event.target.className === "delete-budget-line") {
      console.log(`Let's delete a budget line`)
      console.log(`The budgetLineId is --> `, arguments[1])
      const budgetIdToDelete = arguments[1].budgetLine.budget_item_id;
      console.log(`The budgetIdToDelete is --> `,budgetIdToDelete)
      this.deleteLineItem(budgetIdToDelete);
    }
  }

  categoryForm () {
    // Launch a window to set the category and hours allocated
    this.addBudgetCategory(/* The results of the form submission */);
  }

  budgetItemForm (budgetLine) {
    console.log(`The budget line to edit is`, budgetLine)
  }

  //For dev purposes only
  mockData () { return (
    {
      category: String('Test').concat(`_${Math.random()}`),
      hoursAllocated: String(Math.random()*10),
      budgetId: this.state.budgetId,
    })
  }

  addBudgetCategory () {
    console.log(`Create a pop up form -- ask for category and hours allocated`);
    console.log(`Post a new Budget Line Item for our existing Budget`);
    const instance = axios.create({ baseURL: 'http://localhost:8080' })
    instance.post(`/newBudgetItem/${this.state.budgetId}`, this.mockData())
      .then( (response) => {
        console.log('The response data from the server POST is --> \n', response.data)
        this.fetchBudgetData(this.state.budgetId)
      })
      .catch( (error) => { console.log(`There was an error with the Axios POST --> `, error) })
  }

  editLineItem (budgetItemId) {
    const instance = axios.create({ baseURL: 'http://localhost:8080' })
    instance.put(`/updateBudgetItem/${budgetItemId}`, this.mockData())
      .then( (response) => {
        console.log('The response data from the server PUT is --> \n', response.data)
        this.fetchBudgetData(this.state.budgetId)
      })
      .catch( (error) => { console.log(`There was an error with the Axios PUT --> `, error) })
  }

  deleteLineItem (budgetItemId) {
    const instance = axios.create({ baseURL: 'http://localhost:8080' })
    instance.delete(`/deleteBudgetItem/${budgetItemId}`)
      .then( (response) => {
        console.log('The response data from the server DELETE is --> \n', response.data)
        this.fetchBudgetData(this.state.budgetId)
      })
      .catch( (error) => { console.log(`There was an error with the Axios DELETE --> `, error) })
  }

  fetchBudgetData (budgetId) {
    console.log(`Fetch the budgetId --> `, budgetId);
    const instance = axios.create({ baseURL: `http://localhost:8080` });
    instance.get(`/myBudget/data/${budgetId}`)
      .then( (response) => {
        console.log(`The response.data from the server GET is --> \n`, response.data)
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
        <div id="category-form">
          <p>Add a Category</p>
          <BudgetCategoryForm
            handleClick = { this.handleClick }
          />
        </div>
        <div id="budget">
          <Budget
            budget = { this.state.budget }
            addBudgetCategory = { this.handleClick }
            editLineItem = { this.handleClick }
            deleteLineItem = { this.handleClick }
          />
        </div>
        <div>
          <button className="visualize-budget" onClick={ this.handleClick }>Visualize</button>
        </div>
      </div>
    );
  }
}

export default App;
