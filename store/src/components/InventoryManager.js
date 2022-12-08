import { Box, Typography, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Modal, Container, Stack, TextField, Alert, Grid } from '@mui/material';

import React, {useContext, useEffect, useState} from 'react';

import { Context } from '../App.js';

import Item from './Item.js';
import MyItem from './MyItem.js';
import axios from 'axios';

const itemsPull = async(setItemList) => {
    let itemsFromServer = await axios.get('http://localhost:8081/items');
    
    setItemList(itemsFromServer.data);


}


const handleListView = (listView, setListView) => {
    
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

    
    if(itemCreated.data === ''){
        

    }
    else{//Item was succesfully added
        setItemCreated(true);

    }


}

const checkForMatch = (clicked_userid, loggedIn_userid, setValidMatch) => {
    clicked_userid === loggedIn_userid ? setValidMatch(true) : setValidMatch(false);
    // console.log('Clicked item userid:', clicked_userid);
    // console.log('Logged in User userid:', loggedIn_userid);



}

const loginStyle = {
    postion: 'absolute',
    width: '50%',
    bgcolor: 'background.paper',
    margin: 'auto',
    
}


const InventoryManager = () => {
    

    let firstLoad = true;
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


    //Logic and state required to handle a modal for the viewing/ editing all of the details
    let [cardClicked_id, setCardClicked_id] = useState(-1);
    let [displayCardInfo, setDisplayCardInfo] = useState(false);
    let [clickedItem, setClickedItem] = useState([{
        item_name:'test',
        description:'testtt',
        quantity: -1,
        user_id: -1
    }]);

    //Logic and state to handle if a signed in user can edit the fields
    let [validMatch, setValidMatch] = useState(false);

    const handleInfoClose = () => {
        setDisplayCardInfo(false);
        setCardClicked_id(-1);
    }
   

    useEffect(() => {
        if(cardClicked_id !== -1){
            console.log('Most recent card clicked:', cardClicked_id);
            setDisplayCardInfo(true);
            if(clickedItem.quantity !== -1){
                setClickedItem(itemList.filter(element => element.id === cardClicked_id ));
            }
            checkForMatch(clickedItem[0].user_id, loggedInUser.id, setValidMatch);
            console.log('Valid Match?', validMatch);
            
        }
        
        
        console.log('Clicked Item:', clickedItem);
        

    },[cardClicked_id])




    useEffect(() => {//ON PAGE LOAD GET ALL THE ITEMS.
        itemsPull(setItemList);
        
        
        
    }, [itemCreated]);

    useEffect(() => {
        let tempList = [];
       
        tempList = itemList.filter(element => element.user_id === loggedInUser.id);
        
        setDisplayList(tempList);

        
       

    }, [itemList]);

    

    useEffect(() => {//Ensures that a user is logged in to the page
        

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

                        <Grid container spacing={4}>
                            {displayList.map((element) => {
                                return(<Item item={element} setClickId={setCardClicked_id} />)
                                // if(element.user_id === loggedInUser.id){//Display different cards for items the user has created
                                //     return(<MyItem item={element} />)

                                // }
                                // else{
                                //     return(<Item item={element} />)

                                // }

                            })}

                        </Grid>

                        


                        
                        
                    

                </Container>
                {/**This modal is for handling a verified user trying to add an item */}
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

                {/** THis modal is when a user is trying to get more information or edit a card */}
                <Modal
                    open={displayCardInfo}
                    onClose={handleInfoClose}
                    
                >   
                <Box>
                                   
                    <Box sx={loginStyle}>
                        <Typography>
                            Additional Information
                        </Typography>
                        <Stack justifyContent='center' spacing={2}>
                            <TextField  id="item_name" variant="outlined" label="Item Name" value={clickedItem[0].item_name} 
                            inputProps={{readOnly:true}}
                            >
                                {itemList[cardClicked_id]} </TextField>
                            <TextField  id="item_description" variant="outlined" label="Item Description" value={clickedItem[0].description} inputProps={{readOnly:true}} multiline
                            > </TextField>
                            <TextField  id="citem_quantity" variant="outlined" label="Quantity" value={clickedItem[0].quantity} inputProps={{readOnly:true}}
                            > </TextField>

                        </Stack>

                        <Box>
                        
                    {validMatch ?
                    <Stack justifyContent="center" direction="row" spacing={2}>
                         <Button>DELETE</Button>
                         <Button>Edit</Button>

                     </Stack>
                    
                    
                    
                    :
                     <React.Fragment>
                            
                     </React.Fragment>
                    
                     }

                     </Box>

                    </Box>
                    {/** Need logic to handle what happens if the user is logged in and it is one of their items.
                     * If it is they should be able to edit or delete.
                     * If it is not they should not be able to touch it.
                     */}

                    
                    
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