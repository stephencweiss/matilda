import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BudgetLine extends Component {

  constructor(props) {
    super(props)
    this.state={
      viewMode: 'read-only',
      budgetItemId: props.budgetLine.budget_item_id,
      category: props.budgetLine.category,
      hoursAllocated: props.budgetLine.hours_allocated,
      tempCategoryForm: props.budgetLine.category,
      tempHoursAllocatedForm: props.budgetLine.hours_allocated,
    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderEditableBudgetForm = this.renderEditableBudgetForm.bind(this);
  }

  handleCancel() {
    const category = this.state.category;
    const hoursAllocated = this.state.hoursAllocated;
    this.setState({tempCategoryForm: category, tempHoursAllocatedForm: hoursAllocated, viewMode: 'read-only'})
  }

  handleChange(event) {
    const stateName = event.target.id;
    const stateValue = event.target.value;
    this.setState({[stateName]: stateValue})
  }

  handleModify() {
    this.setState({ viewMode: 'edit' })
  }

  handleSubmit() {
    const category = this.state.tempCategoryForm;
    const hoursAllocated = this.state.tempHoursAllocatedForm;
    this.setState({ category, hoursAllocated, viewMode: 'read-only' }, () => {
      this.props.editLineItem({budgetItemId: this.state.budgetItemId, budgetLineData: {category, hoursAllocated}})
    })
  }

  renderEditableBudgetForm() {
    const { viewMode, budgetItemId, category, hoursAllocated, tempCategoryForm, tempHoursAllocatedForm } = this.state;
    if (viewMode === 'read-only') {
      return (
        <div id={budgetItemId}>
          <ul>{ category } for { hoursAllocated }
          <button className="edit-budget-line" onClick={ this.handleModify }>Modify</button>
          <button className="delete-budget-line" onClick={ (e) => this.props.deleteLineItem(e, this.props) }>Remove</button>
          </ul>
        </div>
      )
    } else if (viewMode === 'edit') {
      return (
        <div>
          <form className="budget-category">
            <label htmlFor="category">Category</label>
            <input id="tempCategoryForm" name="category" value={ tempCategoryForm } onChange={ this.handleChange } placeholder={ category }></input>
            <label htmlFor="hoursAllocated">Hours</label>
            <input id="tempHoursAllocatedForm" name="hours" value={ tempHoursAllocatedForm } onChange={ this.handleChange } placeholder={ hoursAllocated }></input>
          </form>
          <button className="edit-budget-line" onClick={ this.handleSubmit }>Submit</button>
          <button className="cancel-edit" onClick={ this.handleCancel }>Cancel</button>
        </div>
      )
    }
  }

  render() {
    { return this.renderEditableBudgetForm() }
  }
}

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
BudgetLine.propTypes = {
  budgetLine: PropTypes.object,
  editLineItem: PropTypes.func,
  deleteLineItem: PropTypes.func,
};

export default BudgetLine;
