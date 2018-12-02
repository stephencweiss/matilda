const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const chalk = require('chalk')

const db = require('../database/models/models.js')
const errorMessage = chalk.red('Oh No! There was an error -->');

const port = process.argv[2] || 8080;
let app = express()

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname,'../client/dist')))

app.post('/newBudgetItem', (request, response) => {
  // Assume that the budgetId is known and part of the request (body?)
  // the budgetId is defined earlier in the process because that's the page we're on.  
  db.BudgetItem.create({
    category: request.body.category,
    hours_allocated: request.body.hoursAllocated,
    budget_id: request.body.budgetId
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
  db.BudgetItem.findAll({ where: { budget_id: request.params.budgetId } })
    .then(message => response.status(200).send(message))
    .catch(err => response.status(404).send(errorMessage, err))
})

app.listen(port, () => { console.log(`Server is listening on port ${port}`) })