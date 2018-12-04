const { expect } = require('chai');
const React = require('react');
const { mount } = require('enzyme');

describe('basic testing env', () => {
  const Test = React.createElement('div', null, 'React_test_div');
  it('should pass a truthy test', () => {
    expect(true).to.equal(true);
  });

  it('should test a React component', () => {
    const w = mount(Test);
    expect(w.text()).to.equal('React_test_div');
  });
});

describe('babel/webpack setup', () => {
  const JSX = <div>JSX</div>;
  it('should render a JSX element', () => {
    const w = mount(JSX);
    expect(w.text()).to.equal('JSX');
  });
});


// ----------------- SERVER TESTS ----------------- //
// When I figure out environment variables, I can move these tests
// back to the appropriate place, which is <rootDir>/server/server.test.js
// Moving here for now because the server is not able to access a server for which it doesn't have a password
// Removing the password isn't sufficient given how I've currently configured

// Steps to take once remedied
// [] Create a new file <rootDir>/server/server.test.js
// [] Move the code below to the new file
// [] Delete this comment block

// const request = require('supertest');
// const {expect} = require('chai');

// const { app } = require('./server.js');


// describe('/guest endpoints')
// describe('/host endpoints')
// describe('/listing endpoints')
// describe('/booking endpoints')
// describe('/availableNights endpoints', () => {
//   it('should return', () => {
//     request(app)
//     .get('/nights')
//     .expect(200)
//     .end();
//   })
// })