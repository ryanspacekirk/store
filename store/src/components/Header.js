import { AppBar, Button, IconButton, Toolbar, Typography, Box } from "@mui/material";

import React, {useContext, useState} from 'react';
import { NavLink, useNavigate, Navigate, useSearchParams } from "react-router-dom";

import SvgIcon from '@mui/material/SvgIcon';
import { Context } from '../App.js';
import LogIn from "./modals/LogIn.js";

const HomeIcon = (props) => {
    return(
        <Box>
            <SvgIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>

        </Box>
    
    )
}

const handleReturnHome = () => {

}




const handleLogOut = (setLoggedInUser) => {
    setLoggedInUser({});

}

const handleLogIn = (setLogInModal, setLoggedInUser) => {
    
    setLogInModal(true);

}

//loggedInUser.id > 0
const Header = () => {
    const navigate = useNavigate();
    const { loggedInUser, setLoggedInUser } = useContext(Context);
    let [logInModal, setLogInModal] = useState(false);


    const navigateHome = () => {
        navigate('/');
        
    
    }



    return(
        <Box>
        <Box sx={{ flexGrow:1 }}>
            <AppBar position="static">
                <Toolbar >
                    <IconButton onClick={(e) => {navigateHome()}}>
                        <HomeIcon
                            size="large"
                            sx={{ mr:2}}
                        >

                        </HomeIcon>
                        

                    </IconButton>
                    <Typography variant="h4" component="div" sx={{flexGrow:1}}>
                        STORE
                    </Typography>
                    {loggedInUser.id > 0 ?
                        <Box>
                            <Typography>
                                User: {loggedInUser.last_name}, {loggedInUser.first_name}
                            </Typography>
                            <Button onClick={(e) => handleLogOut(setLoggedInUser)} variant="contained" color="success" >LOG OUT</Button>

                        </Box>
                   
                    
                    :
                    <Box>
                            <Button onClick={(e) => handleLogIn(setLogInModal, setLoggedInUser)} variant="contained" color="success" >LOG IN</Button>

                        </Box>

                    }

                    
                </Toolbar>

        </AppBar>

        </Box>
         {logInModal ? 
            
            <LogIn logInSet={setLogInModal}/>
            :
            <React.Fragment></React.Fragment> 
        }           

        </Box>
        
    )


}

export default Header;




