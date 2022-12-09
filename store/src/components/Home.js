import { Paper, Container, Box, Typography, Button, Stack, Modal, TextField, Alert } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { Context } from '../App.js';
import Guest from "./Guest";
import LogIn from "./modals/LogIn.js";
import axios from 'axios';

import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const handleLogin = (setLoginModalOpen) => {
    setLoginModalOpen(true);
}

const handleGuest = (setGuestUser) => {
    setGuestUser(true);
}
const handleCreateAccount = (setCreateModalOpen) => {
    setCreateModalOpen(true);
}



const handleAccountSubmit = async (accountFirstName, accountLastName, accountUsername, accountPassword, setCreateSuccess) => {
    if(await accountCreation(accountFirstName, accountLastName, accountUsername, accountPassword)){//account creation was a success
        setCreateSuccess(true);
    }
    else {//account creation failed
        setCreateSuccess(false);
    }
}



const accountCreation = async(accountFirstName, accountLastName, accountUsername, accountPassword) => {
    let accountCreationResponse = await axios.post(ApiUrl + '/createAccount', {
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
                        Welcome to the STORE, the Storage Table Of Rapid Efficiency.
                    </Typography>
                    <Typography variant="h6">
                        If you are a registered user, please click the log in button below.
                    </Typography>
                    <Typography variant="h6">
                        If you are not a registered user, please click the guest button.
                    </Typography>

                </Box>
                {/* First modal is for log in */}
                {loginModalOpen ? 
                    <LogIn logInSet={setLoginModalOpen} />
                    :
                    <React.Fragment/>

                }   

                

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

                    



                    </Box>

                </Modal>


                <Modal
                    open={createSucces}
                    onClose={handleCloseAccount}
                >
                    <Box sx={loginStyle}>
                    <Typography variant="h6">
                        Create an account below
                    </Typography>
                    <Stack justifyContent="center" spacing={2}>
                        <TextField inputProps={{readOnly:true}} id="accountFirstName" variant="outlined" label="First Name" value={accountFirstName}/>
                        <TextField inputProps={{readOnly:true}} id="accountLastName" variant="outlined" label="Last Name" value={accountLastName} />
                        <TextField inputProps={{readOnly:true}} id="accountUsername" variant="outlined" label="Username" value={accountUsername}  />
                        <TextField inputProps={{readOnly:true}} id="accountPassword" variant="outlined" label="Password" value={accountPassword} />
                        

                    </Stack>

                    {createSucces ? 

                    <Box>

                        <Typography variant="h6">

                            
                        </Typography>

                        <Alert severity="success"> Account Was succesfully created. You can log in now</Alert>
                    </Box>
                    :
                    <Typography variant="h6">

                        
                    </Typography>
                    }



                    </Box>

                </Modal>

                



                <Box sx={{
                    p : 2,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                        backgroundColor:'primary.dark',
                        

                    },
                }}>
                    <Stack justifyContent="center" direction="row" spacing={2}>
                        <Button onClick={(e) => handleLogin(setLoginModalOpen)} variant="contained"> LOGIN </Button>
                        <Button onClick={(e) => handleGuest(setGuestUser)} variant="contained"> GUEST </Button>
                        <Button onClick={(e) => handleCreateAccount(setCreateModalOpen)} variant="contained"> CREATE ACCOUNT</Button>

                    </Stack>
                    

                </Box>

                
                
            </Paper>

        </Container>

    )



}

export default Home;