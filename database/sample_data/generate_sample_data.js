const faker = require('faker');

const generateRandomUser = (id) => {
  const email = faker.internet.email();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const doc = {email, firstName, lastName }
  return doc;
}

const generateRandomBudget = (ownerCount) => {
  const category = faker.random.words(2);
  const ownerId = faker.random.number({ min: 1, max: ownerCount })
  const doc = { category, ownerId }
  return doc;
}

const generateRandomBudgetItem = (budgetCount) => {
  const category = faker.random.words(2);
  const hoursAllocated = faker.random.number({ min: 1, max: 20, precision: 2 });
  const budgetId = faker.random.number({ min: 1, max: budgetCount });
  const doc = { category, hoursAllocated, budgetId};
  return doc;
}

module.exports.generateRandomUser = generateRandomUser;
module.exports.generateRandomBudget = generateRandomBudget;
module.exports.generateRandomBudgetItem = generateRandomBudgetItem;