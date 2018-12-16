import React, { Component } from 'react';

class AddBudgetCategory extends Component {

  constructor(props) {
    super(props)
    this.state={
      category: '',
      hoursAllocated: '',
    }

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

  theBudgetCategoryForm() {
    return (
      <div>
        <form className="budget-category">
          <label htmlFor="category">Category</label>
          <input
            id="category" 
            name="category" 
            value={this.state.category} 
            onChange={this.handleChange} 
            placeholder={this.props.budgetLine ? props.budgetLine.category : 'New budget category name...'}
            >
          </input>
    
          <label htmlFor="hoursAllocated">Hours</label>
          <input
            id="hoursAllocated"
            name="hours"
            value={this.state.hoursAllocated}
            onChange={this.handleChange}
            placeholder={this.props.budgetLine ? props.budgetLine.hours_allocated : 'Hours to allocate...'}
            >
          </input>
        </form>
      </div>
    )
  }

  renderCreateBudgetCategoryForm() {
    const { renderToggle } = this.props;
    if (this.props.renderForm === 'show') {
      return (
        <div>
          { this.theBudgetCategoryForm() }
          <button className="add-budget-category" onClick = { this.handleSubmit }>Submit </button>
          <button onClick = { renderToggle }>Clear</button>
        </div>
      )
    }
    else {
      return (
        <button onClick= { renderToggle }>Add a Category</button>
      )
    }
  }

  render() { return this.renderCreateBudgetCategoryForm() }
}
                
// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
AddBudgetCategory.propTypes = {
  // budget: PropTypes.array
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default AddBudgetCategory;