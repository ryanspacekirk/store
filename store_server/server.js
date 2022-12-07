
const express = require('express');

const app = express();
const router = express.Router()
const cors = require('cors');
const port = 8081;
const knex = require('knex')(require('./knexfile')["development"]);
const bcrypt = require("bcrypt");

const saltRounds = 10; 
const { hash, compare } = bcrypt;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log('STORE server is up and running on port ', port);
  })

app.get('/', (req, res) =>{
    res.status(200).send('Reached the base route for the STORE server.');

})

//--------------------app.get for login---------------------------------------------------------------------------------

app.get('/login', async(req, res) => {//Called When a user tries to log in.
    console.log('--Login attempted--');
    console.log(req.query);
    console.log('Login username', req.query.username );
    console.log('Login password', req.query.password );
    let userAccount;
    let verifedAccount = false;

    const validateHash = async (storedHash, providedPassword) => {
        let hashResult = await compare (providedPassword, storedHash);
        console.log('Waffle House: ', hashResult);


        return hashResult;

    }

    // let waffleHouse = await getPasswor

    try {
        userAccount = await knex.from('account').select('*').where({
            username:req.query.username
        });
        if(userAccount == ''){//no user matched username
            console.log('no user found')
        }
        else{//username enterned matches a result in the db
            console.log('Account username: ', userAccount[0].username)
            let waffleHouse =  await validateHash(userAccount[0].password, req.query.password);
            if(waffleHouse){//pasword matches the username
                res.status(200).send(userAccount);

            }
            else{//incorrect password
                res.status(200).send('');

            }

        }
        console.log('User Account Value:', userAccount);
        // userAccount.map(async(element) => {
        //     console.log('What the user entered on login: ', req.query.password);
        //     console.log('What got stored in the DB: ', element.password);
        //     let waffleHouse =  await validateHash(element.password, req.query.password);
        //     console.log('Waffle House Return--', waffleHouse)
        //     if(!waffleHouse){//Account has not been verified
        //         console.log('account not verified!!!!');
        //         userAccount = null;

        //     }
        // })
        // console.log('User account:', userAccount);

    } catch (e) {

    }

    if(verifedAccount){

    }

    

});//-----------------------------------------------------------------------------------------------------------------------

//---------------app.post for account creation---------------------------------------------------------------------------------
app.post('/createAccount', async(req, res) => {
    console.log('--User account creation attempted--');
    console.log(req.query);
    console.log('Account username', req.body.username );
    console.log('Account password', req.body.password );
    console.log('Account First Name', req.body.first_name );
    console.log('Account Last Name', req.body.last_name );

    let createdAccount;

    ///////SALTING AND HASHING RIGHT HERE
    let hashedPassword = await hash(req.body.password, saltRounds);
    console.log("BCrypt Hashed Password:", hashedPassword);
        




    ///END DSALTING AND HASHING

    try{//insert and create a new user in database
        let findUsernameMatch = await knex.from('account').select('*').where({
            username:req.body.username
        });
        
        let numMatches = 0;
        findUsernameMatch.map(() => numMatches++);

        console.log('findusername match number:', numMatches);

        if(numMatches === 0){//Username does not already exist. Free to Make account
            createdAccount = await knex('account').insert({
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                username:req.body.username,
                password:hashedPassword                
            });
            console.log('Account was succesfully created');

        }
        else{//Username is taken. User must try again/
            createdAccount = null;
            console.log('Account was NOT created')

        }
        

    } catch(e){

    }

    res.status(200).send(createdAccount);


});//-----------------------------------------------------------------------------------------------------------------------



//----------app.get for items-------------------------------------------------------------------------------------------

app.get('/items', async(req, res) => {
    console.log('Requested items from server');
    let itemList;
    
    try{
        itemsList = await knex.from('item').select('*');
        console.log('Items List:', itemsList);

    } catch (e){

    }
    res.status(200).send(itemsList);
});//-----------------------------------------------------------------------------------------------------------------------