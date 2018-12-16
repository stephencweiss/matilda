import React from 'react';
import axios from 'axios';

import Budget from './budget.jsx';
import AddBudgetCategory from './addBudgetCategory.jsx';
import BudgetHoursAnalysis from './budgetHoursAnalysis.jsx';
import sumBudgetHours from '../utils/sumBudgetHours.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      budgetName: this.props.budgetName,
      budget: [],
      budgetId: '',
      renderForm: 'hide',
      budgetHours: undefined
    };
    this.commitBudgetCategory = this.commitBudgetCategory.bind(this);
    this.editLineItem = this.editLineItem.bind(this);
    this.deleteLineItem = this.deleteLineItem.bind(this);
    this.budgetItemForm = this.budgetItemForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleViewMode = this.toggleViewMode.bind(this);
    this.fetchBudgetData = this.fetchBudgetData.bind(this);
    
    this.sumBudgetHours = sumBudgetHours.bind(this);
  }

  handleClick (event, data) {
    console.log(`The data passed through! --> `, data);
    if (event.target.className === "visualize-budget") {
      console.log(`Alert! You've selected visualize; Details on event -->`, event.target);
      console.log(`Let's visualize`)
    }
    if (event.target.className === "add-budget-category") {
      console.log(`Let's add a budget category`)
      data["budgetId"] = this.state.budgetId
      const budgetLineData = data;
      this.commitBudgetCategory(budgetLineData)
    }
    if (event.target.className === "edit-budget-line") {
      console.log(`Let's edit a budget line`)
      
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

  toggleViewMode() {
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

  editLineItem ({ budgetItemId, budgetLineData }) {
    const instance = axios.create({ baseURL: 'http://localhost:8080' })
    instance.put(`/updateBudgetItem/${budgetItemId}`, budgetLineData) // budgetLineData needs to be defined
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
      .then( (response) => { 
        const budgetHours = this.sumBudgetHours(response.data)
        this.setState({budgetId: budgetId, budget: response.data, budgetHours: budgetHours}) })
      .catch( (error) => { console.log(`There was an error with the Axios GET --> `, error) })
  }

  componentDidMount() {
    this.fetchBudgetData();
  }

  render() {
    return (
      <div>
        <h1>Welcome to your time budget!</h1>
        <div id = "username">
          <h2 >User: { this.state.user }</h2>
        </div>
        <div id = "budget-name">
          <h2>Budget: { this.state.budgetName }</h2>
        </div>
        <div id = "category-form">
          <AddBudgetCategory 
            onClick={this.handleClick} 
            renderForm={this.state.renderForm}
            renderToggle={this.toggleViewMode}
          />
        </div>
        <div id = "budget">
          <Budget
            budget = { this.state.budget }
            commitBudgetCategory = { this.handleClick }
            editLineItem = { this.editLineItem }
            deleteLineItem = { this.handleClick }
          />
        </div>
        <div>
          <button 
            className = "visualize-budget"
            onClick = { this.handleClick }> Visualize
          </button>
        </div>
        <div>
          <BudgetHoursAnalysis budgetHours={ this.state.budgetHours }/>
        </div>
      </div>
    );
  }
}

export default App;
