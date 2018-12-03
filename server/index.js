const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const chalk = require('chalk')

const db = require('../database/models/models.js')
const config = require('../config.json')
const environment = config.environment

const errorMessage = chalk.red('Oh No! There was an error -->');

const port = process.argv[2] || config[environment].app_port;
let app = express()

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname,'../client/dist')))

app.post('/newBudgetItem/:budgetId', (request, response) => {
  db.BudgetItem.create({
    category: request.body.category,
    hours_allocated: request.body.hoursAllocated,
    budget_id: request.params.budgetId
  })
    .then(result => response.status(201).send(result))
    .catch(err => response.status(500).send(errorMessage, err));
});

app.get('/budgetItem', (request, response) => {
  db.BudgetItem.findAll({}) 
    .then(message => response.status(200).send(message))
    .catch(err => response.status(404).send(errorMessage, err));
});

app.get('/myBudget/:budgetId', (request, response) => {
  const serveApp = path.join(`${__dirname}/../client/dist/index.html`);
  response.status(200).sendFile(serveApp);
})

app.get('/myBudget/data/:budgetId', (request, response) => {
  db.BudgetItem.findAll({ where: { budget_id: request.params.budgetId } })
    .then(message => response.status(200).send(message))
    .catch(err => response.status(404).send(errorMessage, err))
})

app.put('/updateBudgetItem/:budgetItemId', (request, response) => {
  db.BudgetItem.update({
    category: request.body.category,
    hours_allocated: request.body.hoursAllocated
    },
    { where: 
      { budget_item_id: request.params.budgetItemId }
  })
    .then(message => response.status(200).send(message))
    .catch(err => response.status(404).send(errorMessage, err))
})

app.delete('/deleteBudgetItem/:budgetItemId', (request, response) => {
  console.log(chalk.green(`Budget Id to delete -->`),request.params.budgetItemId)
  db.BudgetItem.destroy({ 
    where: { budget_item_id: request.params.budgetItemId },
    limit: 1 
  })
    .then(() => response.sendStatus(204))
    .catch(err => response.status(404).send(errorMessage, err))
})

app.listen(port, () => { console.log(`Server is listening on port ${port}`) })
