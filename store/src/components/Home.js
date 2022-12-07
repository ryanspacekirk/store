import { Paper, Container, Box, Typography, Button, Stack, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";


const handleLogin = (setLoginModalOpen) => {
    console.log("Login button clicked");
    setLoginModalOpen(true);

}

const handleGuest = () => {
    console.log("Guest Button Clicked");


}

const handleLoginSubmit = (setVerifiedUser, username, password, setLoginModalOpen) => {
    console.log("Login Submit Clicked ");
    console.log('Account UserName: ', username);
    console.log('Account Password: ', password);
    if(validLogin(username, password)){//succesful login
        setVerifiedUser(true);
        setLoginModalOpen(false);
        

    }
    else{//bad login attempt
        setVerifiedUser(false);

    }




}

const validLogin = (username, password) => {
    if(username === 'admin' && password === 'admin'){//Will need to do a database call here to check user table
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
    const navigate = useNavigate();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const handleClose = () => setLoginModalOpen(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifiedUser, setVerifiedUser] = useState(false);

    useEffect(() => {
        console.log('USE EFFECT TRIGGERED');
        console.log('Use Effect Value:', verifiedUser);

        if(verifiedUser){
            navigate('/InventoryManager');
        }

    }, [verifiedUser]);

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
                        <Button onClick={(e) => handleLoginSubmit(setVerifiedUser, username, password, setLoginModalOpen)} variant="contained" >SUBMIT</Button>

                    </Stack>


                    </Box>

                </Modal>


                <Box >
                    <Stack justifyContent="center" direction="row" spacing={2}>
                        <Button onClick={(e) => handleLogin(setLoginModalOpen)} variant="contained"> LOGIN </Button>
                        <Button onClick={handleGuest} variant="contained"> GUEST </Button>

                    </Stack>
                    

                </Box>

                <Box >
                    
                    {verifiedUser ? <Typography variant="h4"> User Is Validated</Typography>
                    :
                    <Typography variant="h4"> User Is NOT Validated</Typography>}
                    
                    
                    

                </Box>
                
            </Paper>

        </Container>

    )



}

export default Home;