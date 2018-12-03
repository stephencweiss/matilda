import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/src/components/app.jsx';
import { wrap } from 'module';


describe('Main app renders', () => {
  test( 'renders basic budget details', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({user:'TestUser', budgetName:'TestBudget'})
    expect(wrapper.state().user).toEqual('TestUser');
    expect(wrapper.state().budgetName).toEqual('TestBudget');
    expect(wrapper.find('h1').text()).toEqual('Welcome to your time budget!');
    expect(wrapper.find('#username').text()).toEqual('User: TestUser');
    expect(wrapper.find('#budgetName').text()).toEqual('Budget: TestBudget');
  })
})

// Test a mock http request when a specific budget is loaded
// Once the app mounts, we should mock an HTTP request with the following
// When that is done mocking, we can confirm that
  // state().budget.length === 3
  // state().budget[0].budget_item_category === "admin"
  // state().budget[2].budget_item_category === "40.00"
// [
//   {
//     "budget_id": 1,
//     "budget_item_id": 1,
//     "category": "admin",
//     "hours": "10.00",
//   },
//   {
//     "budget_id": 1,
//     "budget_item_id": 2,
//     "category": "study",
//     "hours": "20.00",
//   },
//   {
//     "budget_id": 1,
//     "budget_item_id": 3,
//     "category": "work",
//     "hours": "40.00",
//   }
// ]