import React from 'react';
import { shallow, mount } from 'enzyme';
import BudgetLine from '../client/src/components/budgetline.jsx';
import { wrap } from 'module';

const _mockBudgetItem = {
  "budget_id": 1,
  "budget_item_id": 1,
  "category": "admin",
  "hours": "10.00",
};
const _mockIndex = 2

describe('BudgetLine component renders', () => {
  test( 'renders A Budget Line div', (_mockBudgetItem, _mockIndex) => {
    const wrapper = shallow(<BudgetLine budgetLine = { _mockBudgetItem } id = { _mockIndex }/>);
    expect(wrapper.find('#id')).toEqual(2);
  })
})