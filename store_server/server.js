
const express = require('express');

const app = express();
const router = express.Router()
const cors = require('cors');
const port = 8081;
const knex = require('knex')(require('./knexfile')["development"]);

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log('STORE server is up and running on port ', port);
  })

app.get('/', (req, res) =>{
    res.status(200).send('Reached the base route for the STORE server.');

})