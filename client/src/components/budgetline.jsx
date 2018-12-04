import React from 'react';
import PropTypes from 'prop-types';

const BudgetLine = (props) => {
  return (
    <div id={props.budgetLine.budget_item_id}>
      <ul>{props.budgetLine.category} for {props.budgetLine.hours_allocated}
      <button className="edit-budget-line" onClick={ (e) => props.editLineItem(e, props) }>Modify</button>
      <button className="delete-budget-line" onClick={ (e) => props.deleteLineItem(e, props) }>Remove</button>
      </ul>
    </div>
  )
}

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
BudgetLine.propTypes = {
  budgetLine: PropTypes.object,
  editLineItem: PropTypes.func,
  deleteLineItem: PropTypes.func,
};

export default BudgetLine;
