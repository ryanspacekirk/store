import { Paper, Container, Box, Typography, Button, Stack, Modal, TextField, Alert } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { Context } from '../App.js';
import Guest from "./Guest";
import axios from 'axios';



const handleLogin = (setLoginModalOpen) => {
    setLoginModalOpen(true);
}

const handleGuest = (setGuestUser) => {
    setGuestUser(true);
}
const handleCreateAccount = (setCreateModalOpen) => {
    setCreateModalOpen(true);
}

const handleLoginSubmit = async(setVerifiedUser, username, password, setLoginModalOpen, setLoggedInUser) => {    
    if(await validLogin(username, password, setLoggedInUser)){//succesful login
        setVerifiedUser(true);
        setLoginModalOpen(false);
    }
    else{//bad login attempt
        setVerifiedUser(false);
    }
}

const handleAccountSubmit = async (accountFirstName, accountLastName, accountUsername, accountPassword, setCreateSuccess) => {
    if(await accountCreation(accountFirstName, accountLastName, accountUsername, accountPassword)){//account creation was a success
        setCreateSuccess(true);
    }
    else {//account creation failed
        setCreateSuccess(false);
    }
}

const validLogin = async(usernameInput, passwordInput, setLoggedInUser) => {
    let usernameResponse = await axios.get('http://localhost:8081/login',  {
        params: {
            username: usernameInput,
            password: passwordInput
        }
    });
    
    if(usernameResponse.data.length !== 0 ){// A user account exits!
        setLoggedInUser(usernameResponse.data[0]);
        return true;
    }
    else {
        return false;
    }
}

const accountCreation = async(accountFirstName, accountLastName, accountUsername, accountPassword) => {
    let accountCreationResponse = await axios.post('http://localhost:8081/createAccount', {
        first_name:accountFirstName,
        last_name:accountLastName,
        username:accountUsername,
        password:accountPassword

    } );

    if(accountCreationResponse.data === ''){//Account username is already taken. User needs to try again with a new username
        return(false);
    }
    else {//account was succesfully created
        return(true);
    }
    


}

const loginStyle = {
    postion: 'absolute',
    width: '50%',
    bgcolor: 'background.paper',
    margin: 'auto',
    
}



const Home = () => {
    const { loggedInUser, setLoggedInUser } = useContext(Context);
    const navigate = useNavigate();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const handleCloseLogin = () => setLoginModalOpen(false);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const handleCloseAccount = () => {
        setCreateModalOpen(false);
        setCreateSuccess(false);
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifiedUser, setVerifiedUser] = useState(false);
    const [guestUser, setGuestUser] = useState(false);

    const [accountFirstName, setAccountFirstName] = useState("");
    const [accountLastName, setAccountLasttName] = useState("");
    const [accountUsername, setAccountUsername] = useState("");
    const [accountPassword, setAccountPassword] = useState("");

    const [createSucces, setCreateSuccess] = useState(false);


    useEffect(() => {
        if(verifiedUser){
            navigate('/InventoryManager');
        }

    }, [verifiedUser]);

    useEffect(() => {
        if(guestUser){
            navigate('/Guest');
        }

    }, [guestUser]);

    return(
        <Container>
            <Paper elevation={3}>
                <Box sx={{width:'100%'}} >
                    <Typography variant="h1">
                        STORE
                    </Typography>
                    <Typography variant="h4">
                        Welcome to the store application.
                    </Typography>
                    <Typography variant="h6">
                        If you are a registered user, please click the log in button below.
                    </Typography>
                    <Typography variant="h6">
                        If you are not a registered user, please click the guest button.
                    </Typography>

                </Box>
                {/* First modal is for log in */}
                <Modal
                    open={loginModalOpen}
                    onClose={handleCloseLogin}
                >
                    <Box sx={loginStyle}>
                    <Typography variant="h6">
                        This is the login modal
                    </Typography>
                    <Stack justifyContent="center" spacing={2}>
                        <TextField onChange={(e) => {setUsername(e.target.value)}} id="username" variant="outlined" label="Username" />
                        <TextField onChange={(e) => {setPassword(e.target.value)}} id="password" variant="outlined" label="Password" />
                        <Button onClick={(e) => handleLoginSubmit(setVerifiedUser, username, password, setLoginModalOpen, setLoggedInUser)} variant="contained" >SUBMIT</Button>

                    </Stack>


                    </Box>

                </Modal>

                {/* Second Modal modal is for account creation */}
                <Modal
                    open={createModalOpen}
                    onClose={handleCloseAccount}
                >
                    <Box sx={loginStyle}>
                    <Typography variant="h6">
                        Create an account below
                    </Typography>
                    <Stack justifyContent="center" spacing={2}>
                        <TextField onChange={(e) => {setAccountFirstName(e.target.value)}} id="accountFirstName" variant="outlined" label="First Name" />
                        <TextField onChange={(e) => {setAccountLasttName(e.target.value)}} id="accountLastName" variant="outlined" label="Last Name" />
                        <TextField onChange={(e) => {setAccountUsername(e.target.value)}} id="accountUsername" variant="outlined" label="Username" />
                        <TextField onChange={(e) => {setAccountPassword(e.target.value)}} id="accountPassword" variant="outlined" label="Password" />
                        <Button onClick={(e) => handleAccountSubmit(accountFirstName, accountLastName, accountUsername, accountPassword, setCreateSuccess)} variant="contained" >SUBMIT</Button>

                    </Stack>

                    {createSucces ? 

                    <Box>

                        <Typography variant="h6">

                            Account creation status: Succes
                        </Typography>

                        <Alert severity="success"> Account Was succesfully created. You can log in now</Alert>
                    </Box>
                    :
                    <Typography variant="h6">

                        Account creation status: Failure
                    </Typography>
                    }



                    </Box>

                </Modal>

                



                <Box >
                    <Stack justifyContent="center" direction="row" spacing={2}>
                        <Button onClick={(e) => handleLogin(setLoginModalOpen)} variant="contained"> LOGIN </Button>
                        <Button onClick={(e) => handleGuest(setGuestUser)} variant="contained"> GUEST </Button>
                        <Button onClick={(e) => handleCreateAccount(setCreateModalOpen)} variant="contained"> CREATE ACCOUNT</Button>

                    </Stack>
                    

                </Box>

                <Box >
                    
                    {verifiedUser ? <Typography variant="h4"> User Is Validated</Typography>
                    :
                    <Typography variant="h4"> User Is NOT Validated</Typography>}

                    <Typography variant="h4">
                        Validated user {loggedInUser.first_name}
                    </Typography>
                    
                    
                    
                    

                </Box>
                
            </Paper>

        </Container>

    )



}

export default Home;