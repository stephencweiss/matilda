const Sequelize = require('sequelize');
const chalk = require('chalk')

const config = require('../../config.json')
// const postgreSQL = require('../connectPG')

const environment = config.environment

const postgreSQL = new Sequelize(
  config[environment].db_database, //process.env.MYSQL_DATABASE, //Database
  config[environment].db_username, //User
  config[environment].db_password,  // Password
  {
    host: config[environment].db_host, // Host
    port: config[environment].db_port, //Port
    dialect: 'postgres',
    logging: false,
  }
);

postgreSQL.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error(chalk.red('Unable to connect to the database -->\n'), err);
  });

const Op = postgreSQL.Op;

// User schema
const User = postgreSQL.define('users', {
  user_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, constraints: true },
  email: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  salted_password: Sequelize.STRING,
  salt: Sequelize.STRING
}, {
  timestamps: false,
});

// Budget Schema
const Budget = postgreSQL.define('budgets', {
  budget_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, constraints: true },
  category: Sequelize.STRING,
  owner_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
    primaryKey: true
  }
}, {
  timestamps: false,
});

// BudgetItem schema
const BudgetItem = postgreSQL.define('budget_items', {
  budget_item_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, constraints: true },
  category: Sequelize.STRING,
  hours_allocated: Sequelize.DECIMAL(10, 2),
  budget_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Budget,
      key: 'budget_id',
    },
  },
}, {
  timestamps: false,
});


// Establish relationships
Budget.belongsTo(User, { foreignKey: 'owner_id', targetKey: 'user_id', constraints: false })
BudgetItem.belongsTo(Budget, { foreignKey: 'budget_id', targetKey: 'budget_id', constraints: false })

// 1:m relationships
// User.hasMany(Budget)
// Budget.hasMany(BudgetItem)

// Create a new tables if they doesn't exist;
// Note: Sequelize *cannot* create a database if it doesn't exist. https://github.com/sequelize/sequelize/issues/1908
// Postgres does not allow `CREATE DATABASE IF NOT EXISTS` like other SQL DBMS
// Once the database exists, however, it can create the schema.
postgreSQL.sync()
  .then(() => postgreSQL.query('USE matilda'))
  .then(() => User.sync())
  .then(() => Budget.sync())
  .then(() => BudgetItem.sync())
  .then(() => console.log(chalk.green('Sequelize Sync worked!')))
  .catch(err => console.log(chalk.red('Oh, no! An Error! -->'), err));

// Export schemas
exports.User = User;
exports.Budget = Budget;
exports.BudgetItem = BudgetItem;

// Export Op
exports.Op = Op;
