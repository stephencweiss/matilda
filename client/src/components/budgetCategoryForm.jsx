import React, { Component } from 'react';

class BudgetCategoryForm extends Component {

  constructor (props){
    super(props)
    this.state={}
    this.renderCreateBudgetCategoryForm = this.renderCreateBudgetCategoryForm.bind(this)
    this.theBudgetCategoryForm = this.theBudgetCategoryForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  } 

  handleSubmit (event) {
    const data = this.state;
    this.props.onClick(event, data);
    event.preventDefault();
  }

  handleChange(event) {
    const stateName = event.target.id;
    const stateValue = event.target.value;
    this.setState({[stateName]: stateValue})
  }

  theBudgetCategoryForm(){
    return (
      <div>
        <form className="add-budget-category">
          <label htmlFor="category">Category</label>
          <input
            type="text" 
            id="category" 
            name="category" 
            value={this.state.category} 
            onChange={this.handleChange} 
            placeholder={this.props.budgetLine ? props.budgetLine.category : 'New budget category name...'}>
          </input>
    
          <label htmlFor="hoursAllocated">Hours</label>
          <input
            type="text"
            id="hoursAllocated"
            name="hours"
            value={this.state.hoursAllocated}
            onChange={this.handleChange}
            placeholder={this.props.budgetLine ? props.budgetLine.hours_allocated : 'Hours to allocate...'}>
          </input>

          {/* <input type="submit" value="submit" id="category-submit"/> */}
        </form>
      </div>
    )
  }

  renderCreateBudgetCategoryForm() {
    const {renderToggle} = this.props;
    if (this.props.renderForm === 'show') {
      return (
        <div>
          {this.theBudgetCategoryForm()}
          <button className="add-budget-category" onClick= { this.handleSubmit }>Submit </button>
          <button onClick= { renderToggle }>Clear </button>
        </div>
      )
    }
    else {
      return (
        <button onClick= { renderToggle }>Add a Category </button>
      )
    }
  }

  render() {
    console.log(`The budget category props are --> `, this.props)
    return (<div>{this.renderCreateBudgetCategoryForm()}</div>)
  }
}
                
// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
BudgetCategoryForm.propTypes = {
  // budget: PropTypes.array
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default BudgetCategoryForm;