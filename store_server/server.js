
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

app.get('/login', async(req, res) => {//Called When a user tries to log in.
    console.log('--Login attempted--');
    console.log(req.query);
    console.log('Login username', req.query.username );
    console.log('Login password', req.query.password );
    let userAccount;

    try {
        userAccount = await knex.from('account').select('*').where({
            username:req.query.username,
            password:req.query.password
        })
        console.log('User account:', userAccount);

    } catch (e) {

    }


    res.status(200).send(userAccount);

})