import React, { Component } from 'react';

class BudgetCategoryForm extends Component {

  constructor (props){
    super(props)
    this.state={}
    this.renderCreateBudgetCategoryForm = this.renderCreateBudgetCategoryForm.bind(this)
    this.theBudgetCategoryForm = this.theBudgetCategoryForm.bind(this);
  } 

  theBudgetCategoryForm(){
    return (
      <div>
        <form onSubmit={(e) => {
            console.log(`The function called on Submit -->`, e)}
          }>
            <label htmlFor="category-name">Category</label>
            <input type="text" id="category-name" name="category-name" placeholder={this.props.budgetLine ? props.budgetLine.category : 'New budget category name...'}></input>
      
            <label htmlFor="hours-allocated">Hours</label>
            <input type="text" id="hours-allocated" name="hours" placeholder={this.props.budgetLine ? props.budgetLine.hours_allocated : 'Hours to allocate...'}></input>
      
            <input type="submit" value="submit" id="category-submit"/>
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
          <button onClick= { renderToggle }>Submit </button>
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