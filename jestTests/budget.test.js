import React from 'react';
import { shallow, mount } from 'enzyme';
import Budget from '../client/src/components/budget.jsx';
import { wrap } from 'module';

const props = {
  budget: [
    {
      "budget_id": 1,
      "budget_item_id": 1,
      "category": "admin",
      "hours": "10.00",
    },
    {
      "budget_id": 1,
      "budget_item_id": 2,
      "category": "work",
      "hours": "40.00",
    },
    {
      "budget_id": 1,
      "budget_item_id": 3,
      "category": "study",
      "hours": "5.00",
    },
  ]
}

describe('Budget component renders', () => {
  test( 'renders budget div', (props) => {
    const wrapper = shallow(<Budget budget = {[] }/>);
    expect(wrapper.find('#budget'));
  })
})