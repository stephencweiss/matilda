

function sumBudgetHours (budgetArray) {
  const initialValue = 0;  
  const budgetHours = budgetArray.reduce( function (accumulator, currentValue) {
    return accumulator + Number(currentValue.hours_allocated)
  }, initialValue);
  return budgetHours;
}

export default sumBudgetHours;