import { Paper, Container, Box, Typography, Button, Stack, Modal, TextField } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { Context } from '../App.js';
import Guest from "./Guest";
import axios from 'axios';



const handleLogin = (setLoginModalOpen) => {
    console.log("Login button clicked");
    setLoginModalOpen(true);

}

const handleGuest = (setGuestUser) => {
    console.log("Guest Button Clicked");
    setGuestUser(true);


}

const handleLoginSubmit = async(setVerifiedUser, username, password, setLoginModalOpen, setLoggedInUser) => {
    console.log("Login Submit Clicked ");
    console.log('Account UserName: ', username);
    console.log('Account Password: ', password);
    
    if(await validLogin(username, password, setLoggedInUser)){//succesful login
        setVerifiedUser(true);
        setLoginModalOpen(false);
        
        

    }
    else{//bad login attempt
        setVerifiedUser(false);

    }




}

const validLogin = async(usernameInput, passwordInput, setLoggedInUser) => {
    console.log('Username value in ValidLogin: ', usernameInput)
    
    let usernameResponse = await axios.get('http://localhost:8081/login',  {
        params: {
            username: usernameInput,
            password: passwordInput
        }
    });
    
    console.log('Response from Server:', usernameResponse.data[0]);
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



const Home = () => {
    const { loggedInUser, setLoggedInUser } = useContext(Context);
    const navigate = useNavigate();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const handleClose = () => setLoginModalOpen(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifiedUser, setVerifiedUser] = useState(false);
    const [guestUser, setGuestUser] = useState(false);

    useEffect(() => {
        console.log('USE EFFECT TRIGGERED');
        console.log('Use Effect Value:', verifiedUser);

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

                <Modal
                    open={loginModalOpen}
                    onClose={handleClose}
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


                <Box >
                    <Stack justifyContent="center" direction="row" spacing={2}>
                        <Button onClick={(e) => handleLogin(setLoginModalOpen)} variant="contained"> LOGIN </Button>
                        <Button onClick={(e) => handleGuest(setGuestUser)} variant="contained"> GUEST </Button>

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