import { Box, Typography, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Modal, Container, Stack, TextField, Alert, Grid, Dialog, DialogContentText, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import React, {useContext, useEffect, useState, useRef} from 'react';
import { NavLink, useNavigate, Navigate } from "react-router-dom";

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
    console.log('Item Creation Descripion', createItem_description);
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
    
}

const handleDelete =  (setDeleteDialog) => {
    setDeleteDialog(true);
    
    

}
const clearDelete = (setDeleteDialog) => {
    setDeleteDialog(false);
}

const handleDeleteDialog = async(deleteId, setSuccessfullDelete, setItemList, setDeleteDialog ) => {
    let deletedElement = await axios.delete(`http://localhost:8081/deleteItem/${deleteId}`);
    
    if(deletedElement.status === 204){
        console.log('SUCCESFUL DELETE RESPONSE');
        deleteCleanUp(setItemList, setDeleteDialog);
        
        // setSuccessfullDelete(true);
    }
    
    
}

const deleteCleanUp = (setItemList, setDeleteDialog) => {
    itemsPull(setItemList);
    setDeleteDialog(false);


}

const handleUpdate = async(setEditModal, setInfoModal) => {
    setEditModal(true);
    setInfoModal(false);

}

const handleUpdateSubmit = async(updateid, update_item_name, update_description, update_quantity, setSuccessfulUpdate) => {
    

    let updateResult = await axios.patch(`http://localhost:8081/updateItem/${updateid}`, {
        item_name:update_item_name,
        description:update_description,
        quantity:update_quantity
    });
    

    if(updateResult.status === 200){
        
        setSuccessfulUpdate(true);
    }

}

const loginStyle = {
    postion: 'absolute',
    width: '50%',
    bgcolor: 'background.paper',
    margin: 'auto',
    
}


const InventoryManager = () => {
    const navigate = useNavigate();
    const isMounted = useRef(false);

    const navigateHome = () => {
        navigate('/');
        
    
    }
    

    
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
    
    let [displayCardInfo, setDisplayCardInfo] = useState(false);
    let [clickedItem, setClickedItem] = useState({
        id:-1,
        item_name:'test',
        description:'testtt',
        quantity: -1,
        user_id: -1
    });

    //Logic and state to handle if a signed in user can edit the fields
    let [validMatch, setValidMatch] = useState(false);

    //Logic and state required to delete from database
    let [succesfullDelete, setSuccessfullDelete] = useState(false);
    let [deleteDialog, setDeleteDialog] = useState(false);

    const handleDeleteDialogClose = () => {
        setDeleteDialog(false);
        setSuccessfullDelete(true);
    }

    //logic and state to handle an update to the db
    let [viewEditModal, setViewEditModal] = useState(false);
    let [update_item_name, setUpdate_item_name] = useState('');
    let [update_description, setUpdate_description] = useState('');
    let [update_quantity, setUpdate_quantity] = useState(-1);
    let [succsessful_update , setSuccessfulUpdate] = useState('false');

    const handleEditCLose = () => {
        setViewEditModal(false);
        //setSuccessfullDelete(false);

    }

    useEffect(() => {//UPDATED RECORD SUCCESFULLY
        itemsPull(setItemList);
        

    }, [succsessful_update])

    useEffect(() => {

        //After a succesfull delete
        //-Need to repull the device list from the server to reflect change
        itemsPull(setItemList);
        


    }, [succesfullDelete])

    const handleInfoClose = () => {//Gets called after the delte button is pressed. Need to update item list at this point
        //itemsPull(setItemList);
        setDisplayCardInfo(false);
        
    }

    useEffect(() => {
        setDisplayCardInfo(false);
    }, [])
   

    useEffect(() => {
        if(isMounted.current){
            
            setDisplayCardInfo(true);            
            checkForMatch(clickedItem.user_id, loggedInUser.id, setValidMatch);

            //populate edit fields
            setUpdate_item_name(clickedItem.item_name);
            setUpdate_description(clickedItem.description);
            setUpdate_quantity(clickedItem.quantity);

        }
        else{
            isMounted.current = true;
        }

    },[clickedItem])




    useEffect(() => {//ON PAGE LOAD GET ALL THE ITEMS.
        itemsPull(setItemList);
        
        
        
    }, [itemCreated]);

    useEffect(() => {
        setDisplayCardInfo(false);
        setDeleteDialog(false);
        setViewEditModal(false);
        setSuccessfulUpdate(false);
        //setListView(listView);
        
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
                                return(<Item item={element} setClickedItem={setClickedItem} />)
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
                            <TextField  id="item_name" variant="outlined" label="Item Name" value={clickedItem.item_name} 
                            inputProps={{readOnly:true}}
                            >
                                {itemList[clickedItem.id]} </TextField>
                            <TextField  id="item_description" variant="outlined" label="Item Description" value={clickedItem.description} inputProps={{readOnly:true}} multiline
                            > </TextField>
                            <TextField  id="citem_quantity" variant="outlined" label="Quantity" value={clickedItem.quantity} inputProps={{readOnly:true}}
                            > </TextField>

                        </Stack>

                        <Box>
                        
                    {validMatch ?
                    <Stack justifyContent="center" direction="row" spacing={2}>
                         <Button onClick={(e) => handleDelete(setDeleteDialog)}>DELETE</Button>
                         <Button onClick={(e) =>handleUpdate(setViewEditModal, setDisplayCardInfo)}>Edit</Button>

                     </Stack>
                    
                    
                    
                    :
                     <React.Fragment>
                            
                     </React.Fragment>
                    
                     }

                     </Box>
                        <Dialog
                            open={deleteDialog}
                            onClose={handleDeleteDialogClose}
                        >
                            <DialogTitle id="alert-delete"> 
                                Confirm Delete Of Item?
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id='confirm-before-delete'>
                                    Confirm that you would like to delte this item
                                </DialogContentText>

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={(e) => handleDeleteDialog(clickedItem.id, setSuccessfullDelete, setItemList, setDeleteDialog)}>DELETE</Button>
                                <Button onClick={(e) => clearDelete(setDeleteDialog)}>GO BACK</Button>
                            </DialogActions>
                            



                            </Dialog>

                    </Box>
                    {/** Need logic to handle what happens if the user is logged in and it is one of their items.
                     * If it is they should be able to edit or delete.
                     * If it is not they should not be able to touch it.
                     */}

                    
                    
                     </Box>  

                    

                </Modal>

                {/** THIS MODAL JUST FOR EDITING **/}
                <Modal
                    open={viewEditModal}
                    onClose={handleEditCLose}
                    
                >   
                <Box>
                                   
                    <Box sx={loginStyle}>
                        <Typography>
                            Edit Record Information 
                        </Typography>
                        <Stack justifyContent='center' spacing={2}>
                            <TextField onChange={(e) => setUpdate_item_name(e.target.value)}  id="edit_item_name" variant="outlined" label="Item Name" value={update_item_name}  />   
                            <TextField onChange={(e) => setUpdate_description(e.target.value)}  id="edit_item_description" variant="outlined" label="Item Description" value={update_description}   multiline />
                            <TextField onChange={(e) => setUpdate_quantity(e.target.value)} id="edit_item_quantity" variant="outlined" label="Quantity" value={update_quantity}  />
                            

                        </Stack>

                        <Box>
                        
                    
                    <Stack justifyContent="center" direction="row" spacing={2}>
                         <Button onClick={(e) => handleUpdateSubmit(clickedItem.id, update_item_name, update_description, update_quantity, setSuccessfulUpdate)}>SUBMIT CHANGES</Button>
                         
                     </Stack>
                    
                

                     </Box>

                    </Box>
                

                    
                     </Box>  

                    

                </Modal>



            </Container>

            
            

            
        )

    }
    else{
        return(
            <Container>
                <Box>
                    <Typography variant='h4'>
                        User has been logged out!
                    </Typography>
                    <Typography variant='h4'>
                        Please close the web page or return home.
                    </Typography>

                </Box>
                <Box>
                    <Button onClick={navigateHome} variant='contained'>HOME</Button>
                    
                </Box>
            </Container>
        )

    }

      


}

export default InventoryManager;