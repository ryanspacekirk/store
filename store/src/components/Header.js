import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, {useContext} from 'react';

import { Context } from '../App.js';


const handleLogOut = (setLoggedInUser) => {
    setLoggedInUser({});

}


const Header = () => {
    const { loggedInUser, setLoggedInUser } = useContext(Context);
    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton>
                    

                </IconButton>
                <Typography>
                    STORE
                </Typography>
                {loggedInUser.length !==0 ?
                <Typography>
                    User: {loggedInUser.first_name}
                </Typography>
                
                :
                <Typography>
                    User: No Logged in user
                </Typography>

                }

                <Button onClick={(e) => handleLogOut(setLoggedInUser)} variant="contained" color="success" >LOG OUT</Button>
            </Toolbar>

        </AppBar>
    )


}

export default Header;