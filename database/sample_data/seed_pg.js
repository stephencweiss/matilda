const chalk = require('chalk');

const client = require('../connectPg');
const { generateRandomUser, generateRandomBudget, generateRandomBudgetItem } = require('./generate_sample_data.js');

// ------------------ Query Builder ------------------ //
const buildQuery = (insertStatement, records) => {
  const params = [];
  const chunks = [];
  records.forEach(record => {
    const valueClause = []
    Object.keys(record).forEach(param => {
      params.push(record[param])
      valueClause.push('$' + params.length)
    })
    chunks.push('(' + valueClause.join(', ') + ')')
  })
  return {
    text: insertStatement + chunks.join(', '),
    values: params
  }
}

// ------------------ Insert X Records Into PG ------------------ //
const insertPGRecords = async (idStart, idEnd, table) => {
  return new Promise((resolve, reject) => {
    let generatedRecords = [];
    for (let i = idStart; i <= idEnd ; i++) {
      if (table === "users") {
        generatedRecords.push(generateRandomUser(i))
      } else if (table === "budgets") {
        generatedRecords.push(generateRandomBudget(ownerCount))
      } else if (table === 'budget_items') {
        generatedRecords.push(generateRandomBudgetItem(budgetCount))
      }
    }
    resolve(client.query(buildQuery(`INSERT INTO ${table} (${fields[table]}) VALUES `, generatedRecords))
      .catch(err => console.error(chalk.red(`There was an error! --> `), err)));
  })
}

// ------------------ Create A Batch Of Records ------------------ //
const createAPGBatch = async (totalRecordCount, batchCount, table) => {
  // Max recommended batch is 10,000 records;
  client.connect();
  console.time('BatchRun')
  let batchSize = Math.floor(totalRecordCount / batchCount);
  let start = 1;
  let end = batchSize;
  for (let i = 0; i < batchCount; i++) {
    await insertPGRecords(start, end, table)
    start = end + 1;
    end += batchSize;
  }
  console.timeEnd('BatchRun');
  console.log(chalk.green(`The BatchRun attempted to add ${totalRecordCount} records in ${batchCount} batches.`));
  client.end();
}

let fields = {
  users: "email, first_name, last_name",
  budgets: "category, owner_id",
  budget_items:"category, hours_allocated, budget_id"
}

// Example Use:
// Define ownerCount, budgetCount, budgetLines as desired
// Expected relation is ownerCount < budgetCount < budgetLines
// Run one batch at a time *or* refactor to be a promise chain.

// let ownerCount = 10;
// let budgetCount = 2 * ownerCount;
// let budgetLines = 8 * budgetCount;
// createAPGBatch(ownerCount, 1, "users");
// createAPGBatch(budgetCount, 2, "budgets")
// createAPGBatch(budgetLines, 4, "budget_items")

module.exports.createAPGBatch = createAPGBatch;
