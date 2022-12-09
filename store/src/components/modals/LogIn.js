import { Paper, Container, Box, Typography, Button, Stack, Modal, TextField, Alert } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate, Navigate, useSearchParams } from "react-router-dom";

import { Context } from '../../App.js';
import axios from 'axios';

const handleLoginSubmit = async(setVerifiedUser, username, password, setLoginModalOpen, setLoggedInUser, navigate, logInSet) => {    
    if(await validLogin(username, password, setLoggedInUser)){//succesful login
        setVerifiedUser(true);
        setLoginModalOpen(true);
        console.log('Modal function: ', logInSet)
        logInSet(false);
        
        navigate('/InventoryManager');
        //set login modal to false here.

    }
    else{//bad login attempt
        setVerifiedUser(false);
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

const loginStyle = {
    postion: 'absolute',
    width: '50%',
    bgcolor: 'background.paper',
    margin: 'auto',
    
}

const LogIn = ({ logInSet }) => {
    console.log('set log in modal fucntion prop:', logInSet)
    const navigate = useNavigate();
    const { loggedInUser, setLoggedInUser } = useContext(Context);
    let [loginModalOpen, setLoginModalOpen] = useState(true);
    const handleCloseLogin = () => {
        setLoginModalOpen(false);
        logInSet(false);
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifiedUser, setVerifiedUser] = useState(false);
    const [guestUser, setGuestUser] = useState(false);


    return (
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
                <Button onClick={(e) => handleLoginSubmit(setVerifiedUser, username, password, setLoginModalOpen, setLoggedInUser, navigate, logInSet)} variant="contained" >SUBMIT</Button>

            </Stack>


            </Box>

    </Modal>
    )


}

export default LogIn;