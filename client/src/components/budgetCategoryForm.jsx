import React from 'react';

const BudgetCategoryForm = (props) => {
    console.log(`The budget category props are --> `, props)
    return (
      // <div id={props.budgetLine.budget_item_id}>
      <div>
        <form onSubmit={() => console.log(`The function called on Submit`)}>
          <label for="category-name">Category</label>
          <input type="text" id="category-name" name="category-name" placeholder={props.budgetLine ? props.budgetLine.category : 'New budget category name...'}></input>

          <label for="hours-allocated">Hours</label>
          <input type="text" id="hours-allocated" name="hours" placeholder={props.budgetLine ? props.budgetLine.hours_allocated : 'Hours to allocate...'}></input>
          
        </form>
      </div>
    )
}

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
BudgetCategoryForm.propTypes = {
  // budget: PropTypes.array
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default BudgetCategoryForm;