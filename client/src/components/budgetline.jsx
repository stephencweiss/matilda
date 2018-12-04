import React from 'react';
import PropTypes from 'prop-types';

const BudgetLine = (props) => {
  return (
    <div id={props.index}>
      <ul> {props.budgetLine.category} for {props.budgetLine.hours_allocated} </ul>
    </div>
  )
}

export default BudgetLine;