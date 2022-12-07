
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

app.post('/createAccount', async(req, res) => {
    console.log('--User account creation attempted--');
    console.log(req.query);
    console.log('Account username', req.body.username );
    console.log('Account password', req.body.password );
    console.log('Account First Name', req.body.first_name );
    console.log('Account Last Name', req.body.last_name );

    let createdAccount;

    try{//insert and create a new user in database
        let findUsernameMatch = await knex.from('account').select('*').where({
            username:req.body.username
        });
        console.log('findusername match:', findUsernameMatch);
        if(findUsernameMatch == null){
            console.log('No Match found in account table');
        }
        else {

            console.log('Else condition hit in ', findUsernameMatch.length);
        }
        // console.log('Username match test:', findUsernameMatch[0]zss.id);

        if(findUsernameMatch.length !== 0){//Means that the username is already taken
            createdAccount = null;

        }
        else{//Username is not taken so can insert data into database
            createdAccount = await knex('account').insert({
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                username:req.body.username,
                password:req.body.password                
            })

            

        }
        console.log('Created Account', createdAccount);

    } catch(e){

    }

    res.status(200).send(createdAccount);


})