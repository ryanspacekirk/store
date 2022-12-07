import React, {useContext, useEffect, useState} from 'react';

import { Context } from '../App.js';



const InventoryManager = () => {
    const { loggedInUser, setLoggedInUser } = useContext(Context);
    let [loggedInDisplay, setLoggedInDisplay] = useState(true);

    useEffect(() => {
        console.log(loggedInUser);
        console.log('Logged in user id', loggedInUser.id);

        if(loggedInUser.id > 0){
            setLoggedInDisplay(true);
        }
        else {
            setLoggedInDisplay(false);
        }


    }, [loggedInUser])
    
    if(loggedInDisplay){
        return(
            <p> Thank you for being logged in</p>
        )

    }
    else{
        return(
            <p> Please log back in</p>
        )

    }

      


}

export default InventoryManager;