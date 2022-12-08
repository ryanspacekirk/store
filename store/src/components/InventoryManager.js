import { Box, Typography, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Modal, Container, Stack, TextField, Alert } from '@mui/material';

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

const handleAddItem = (setCreateItemOpen) => {
    setCreateItemOpen(true);

}

const handleItemCreate = async(setItemCreated, createItem_name, createItem_description, createItem_quantity, userid) => {
    let itemCreated = await axios.post('http://localhost:8081/newItem',{
            user_id:userid,
            item_name:createItem_name,
            description:createItem_description,
            quantity:createItem_quantity
    });

    console.log('Returned Item from insertion:', itemCreated);
    if(itemCreated.data === ''){
        console.log('ITEM WAS NOT ADDED TO TABLE');

    }
    else{//Item was succesfully added
        setItemCreated(true);

    }


}

const loginStyle = {
    postion: 'absolute',
    width: '50%',
    bgcolor: 'background.paper',
    margin: 'auto',
    
}


const InventoryManager = () => {
    const { loggedInUser, setLoggedInUser } = useContext(Context);
    let [loggedInDisplay, setLoggedInDisplay] = useState(true);
    let [listView, setListView] = useState('my-list');
    let [itemList, setItemList] = useState([]);
    let [displayList, setDisplayList] = useState([]);

    //for create item modal
    let [createItemOpen, setCreateItemOpen] = useState(false);
    let [createItem_name, setCreateItem_name] = useState('');
    let [createItem_description, setCreateItem_description] = useState('');
    let [createItem_quantity, setCreateItem_quantity] = useState(0);
    let [itemCreated, setItemCreated] = useState(false);
    const handleCloseCreateItem = () => {
        //need to refresh the display list at this point 
        setCreateItemOpen(false);
        setItemCreated(false);
    }

    useEffect(() => {//ON PAGE LOAD GET ALL THE ITEMS.
        itemsPull(setItemList);
        console.log(itemList);
        
        
    }, [itemCreated]);

    useEffect(() => {
        let tempList = [];
       
        tempList = itemList.filter(element => element.user_id === loggedInUser.id);
        console.log('Temp List: ', tempList);
        setDisplayList(tempList);

        
       

    }, [itemList]);

    

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
        console.log(itemList);
           


    }, [listView]);
    
    if(loggedInDisplay){
        return(
            <Container>
                <Container>
                    <Box >
                        <Typography>
                            Items
                        </Typography>
                        <Button onClick={setCreateItemOpen} variant='contained' >ADD ITEM</Button>

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

                <Modal
                    open={createItemOpen}
                    onClose={handleCloseCreateItem}
                >
                    <Box sx={loginStyle}>
                    <Typography variant="h6">
                        Create a new item below
                    </Typography>
                    <Stack justifyContent="center" spacing={2}>
                        <TextField onChange={(e) => {setCreateItem_name(e.target.value)}} id="createItem_name" variant="outlined" label="Item Name" />
                        <TextField onChange={(e) => {setCreateItem_description(e.target.value)}} id="createItem_description" variant="outlined" label="Item Description" />
                        <TextField onChange={(e) => {setCreateItem_quantity(e.target.value)}} id="cretateItem_quantity" variant="outlined" label="Quantity" />
                        
                        <Button onClick={(e) => handleItemCreate(setItemCreated, createItem_name, createItem_description, createItem_quantity, loggedInUser.id)} variant="contained" >SUBMIT</Button>

                    </Stack>

                    {itemCreated ?
                        <Box>
                            <Typography variant="h6">

                                Item Insertion status: Succes
                            </Typography>

                            <Alert severity="success"> Item Was succesfully added. You can close this windownow</Alert>
                        </Box>
                        :
                        <Typography variant="h6">

                            Item creation status: Failure
                        </Typography>
                    }
                
                    

                    



                    </Box>

                </Modal>



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