const express = require('express');
const path = require('path');

const port = process.argv[2] || 8080;
let app = express()

app.use('/', express.static(path.join(__dirname,'../client/dist')))

app.listen(port, () => { console.log(`Server is listening on port ${port}`) })