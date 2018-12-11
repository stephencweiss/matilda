import React from 'react';
import PropTypes from 'prop-types';

import BudgetLine from './budgetLine.jsx'

const Budget = (props) => {
  return (
    <div>
      <div className="budget">
        { props.budget.map( (budgetItem, index) => <BudgetLine 
          budgetLine = { budgetItem } 
          key = {`budgetItem`+index}
          id = { index }
          editLineItem = { props.editLineItem }
          deleteLineItem = { props.deleteLineItem } 
        /> )}
      </div>
      <div> 
        <button className="add-budget-category" onClick={ props.commitBudgetCategory }> Add Random Budget Category</button>
      </div>
    </div>
  )
}

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
Budget.propTypes = {
  budget: PropTypes.array
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default Budget;
