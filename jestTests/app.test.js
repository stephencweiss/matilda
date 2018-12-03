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