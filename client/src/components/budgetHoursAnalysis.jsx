import React from 'react';

const BudgetHoursAnalysis = (props) => {
    const percentBudgeted = Math.round((props.budgetHours / 168) * 100, 0);
    
    if (props.budgetHours > 80 ) {
      return (
        <div>
          <p> Hey there overachiever, you've budgeted {percentBudgeted}% of your week. </p>
          <p>  We recommend reducing your budgeted time to under 50% </p>
        </div>
      )
    } else if (props.budgetHours < 40 ) {
      return (
        <div>
          <p> Hey there! Looks like you've got some budgeting to do! </p>
          <p> You've budgeted {percentBudgeted}% of your week. </p>
          <p> We find the people have optimal results between 25-50%. </p>
        </div>
      )
    } else {
      return (
        <div>
          Woot! You've budgeted {percentBudgeted}% of your week. Now get after it!
        </div>
      )
    }
}


export default BudgetHoursAnalysis;