

function preProcessBudgetForGraph (budgetArray) {
  const simpleBudget = {
    labels:[],
    values:[]
  };  
  if (budgetArray) {
    budgetArray.forEach(el => {
      simpleBudget.labels.push(el.category)
      simpleBudget.values.push(el.hours_allocated)
    })
  }
  return simpleBudget;
}

export default preProcessBudgetForGraph;