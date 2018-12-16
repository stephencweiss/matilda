import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BudgetLine from './budgetLine.jsx'

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render(){
    return (
      <div className="budget">
        { this.props.budget.map( (budgetItem, index) => <BudgetLine 
          budgetLine = { budgetItem } 
          key = {`budgetItem`+index}
          id = { index }
          editLineItem = { this.props.editLineItem }
          deleteLineItem = { this.props.deleteLineItem } 
        /> )}
      </div>
    )
  }
}

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
Budget.propTypes = {
  budget: PropTypes.array
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default Budget;
