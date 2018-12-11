import React from 'react';
import axios from 'axios';

import Budget from './budget.jsx';
import BudgetCategoryForm from './budgetCategoryForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      budgetName: this.props.budgetName,
      budget: [],
      budgetId: '',
      renderForm: 'hide'
    };
    this.commitBudgetCategory = this.commitBudgetCategory.bind(this);
    // this.commitBudgetCategoryForm = this.commitBudgetCategoryForm.bind(this);
    this.editLineItem = this.editLineItem.bind(this);
    this.deleteLineItem = this.deleteLineItem.bind(this);
    this.budgetItemForm = this.budgetItemForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleCreateBudgetCategoryForm = this.toggleCreateBudgetCategoryForm.bind(this);
    // this.renderCreateBudgetCategoryForm = this.renderCreateBudgetCategoryForm.bind(this);

    this.fetchBudgetData = this.fetchBudgetData.bind(this);
    //For dev purposes only
    this.mockData = this.mockData.bind(this);
  }

  handleClick (event, data) {
    console.log(`The data passed through! --> `, data);
    if (event.target.className === "visualize-budget") {
      console.log(`Alert! You've selected visualize; Details on event -->`, event.target);
      console.log(`Let's visualize`)
    }
    if ( event === "add-budget-category") { 
      console.log(`Let's add a budget category`)
    }
    if (event.target.className === "add-budget-category") {
      console.log(`Let's add a budget category`)
      data["budgetId"] = this.state.budgetId
      const budgetLineData = data;// need to add a budgetId to the budgetLineData *before* committing
      console.log(`bLD *after* adding budgetId --> `, budgetLineData)
      this.commitBudgetCategory(budgetLineData)
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

  toggleCreateBudgetCategoryForm() {
    if (this.state.renderForm === 'show') { 
      this.setState({renderForm: 'hide'})
    } else {
      this.setState({renderForm: 'show'})
    }
  }

  commitBudgetCategory (budgetLineData) {
    console.log(`the data we *would* commit--> `, budgetLineData)
    console.log(`this.state.budgetId`)
    const instance = axios.create({ baseURL: 'http://localhost:8080' })
    instance.post(`/newBudgetItem/${this.state.budgetId}`, budgetLineData)
      .then( (response) => { this.fetchBudgetData() })
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

  fetchBudgetData () {
    const url = window.location.href.split('/');
    const budgetId = Number(url[url.length -1]);
    if ( isNaN(budgetId) ) { console.log(`No Budget to fetch`); return; }
    
    const instance = axios.create({ baseURL: `http://localhost:8080` });
    instance.get(`/myBudget/data/${budgetId}`)
      .then( (response) => { this.setState({budgetId: budgetId, budget: response.data}) })
      .catch( (error) => { console.log(`There was an error with the Axios GET --> `, error) })
  }

  componentDidMount() {
    this.fetchBudgetData();
    // this.toggleCreateBudgetCategoryForm();
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
          <BudgetCategoryForm onClick={this.handleClick} renderForm={this.state.renderForm} renderToggle={this.toggleCreateBudgetCategoryForm}/>
          {/* Function that toggles a form on/off*/}
          {/* Need to add additional props to BudgetCategoryForm */}
        </div>
        <div id="budget">
          <Budget
            budget = { this.state.budget }
            commitBudgetCategory = { this.handleClick }
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
