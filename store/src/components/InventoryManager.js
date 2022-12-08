import { Box, Typography, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, {useContext, useEffect, useState} from 'react';

import { Context } from '../App.js';

import Item from './Item.js';
import axios from 'axios';

const itemsPull = async(setItemList) => {
    let itemsFromServer = await axios.get('http://localhost:8081/items');
    console.log('Items recieved from server:' ,itemsFromServer.data);
    setItemList(itemsFromServer.data);


}


const handleListView = (listView, setListView) => {
    console.log('list view toggled');
    if(listView === 'my-list'){
        setListView('all-list');
    }
    else{
        setListView('my-list')
    }

}


const InventoryManager = () => {
    const { loggedInUser, setLoggedInUser } = useContext(Context);
    let [loggedInDisplay, setLoggedInDisplay] = useState(true);
    let [listView, setListView] = useState('my-list');
    let [itemList, setItemList] = useState([]);
    let [displayList, setDisplayList] = useState([]);

    useEffect(() => {//ON PAGE LOAD GET ALL THE ITEMS.
        itemsPull(setItemList);
        console.log(itemList);
        


    }, [])

    useEffect(() => {//Ensures that a user is logged in to the page
        console.log(loggedInUser);
        console.log('Logged in user id', loggedInUser.id);

        if(loggedInUser.id > 0){
            setLoggedInDisplay(true);
        }
        else {
            setLoggedInDisplay(false);
        }

    }, [loggedInUser]);

    useEffect(() => {
        let tempList = [];
        if(listView === 'my-list'){
            tempList = itemList.filter(element => element.user_id === loggedInUser.id);
            console.log('Temp List: ', tempList);
            setDisplayList(tempList);

        }
        else{
            setDisplayList(itemList);
        }
        
        
        


    }, [listView]);
    
    if(loggedInDisplay){
        return(
            <Container>
                <Container>
                    <Box >
                        <Typography>
                            Items
                        </Typography>
                        <Button variant='contained' >ADD ITEM</Button>

                    </Box>

            </Container>

                <Container>
                    <FormControl>
                        <FormLabel id="item-list-selector"> List to display:</FormLabel>
                        <RadioGroup
                        aria-labelledby='item-list-selector'
                        defaultValue='my-list'
                        name='list-selector'
                        value={listView}
                        onChange={(e) => handleListView(listView, setListView)}>
                            <FormControlLabel value='my-list' control={<Radio />} label='list of my items' />
                            <FormControlLabel value='all-list' control={<Radio />} label='list of all items' />


                        </RadioGroup>

                    </FormControl>
                    
                    
                        <Typography>
                            Item List
                        </Typography>

                        {displayList.map((element) => {
                            return(
                            <Item item={element} />
                            )

                        })}


                        
                        
                    

                </Container>



            </Container>

            
            

            
        )

    }
    else{
        return(
            <p> Please log back in</p>
        )

    }

      


}

export default InventoryManager;