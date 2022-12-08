import { Box, Typography, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Modal, Container, Stack, TextField, Alert, Grid, Dialog, DialogContentText, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import React, {useContext, useEffect, useState, useRef} from 'react';

import { Context } from '../App.js';

import Item from './Item.js';
import MyItem from './MyItem.js';
import axios from 'axios';



const itemsPull = async(setItemList) => {
    console.log('ITEM MIST UPDATED FROM SERVER');
    let itemsFromServer = await axios.get('http://localhost:8081/items');
    console.log('Item list Update:', itemsFromServer);
    
    setItemList(itemsFromServer.data);


}

const loginStyle = {
    postion: 'absolute',
    width: '50%',
    bgcolor: 'background.paper',
    margin: 'auto',
    
}
const Guest = () => {
    const isMounted = useRef(false);
    let [itemList, setItemList] = useState([]);
    let [createItemOpen, setCreateItemOpen] = useState(false);
    let [displayCardInfo, setDisplayCardInfo] = useState(false);
    let [clickedItem, setClickedItem] = useState({
        id:-1,
        item_name:'test',
        description:'testtt',
        quantity: -1,
        user_id: -1
    });

    useEffect(() => {
        itemsPull(setItemList);

    }, [])


    useEffect(() => {
        if(isMounted.current){
            console.log('Clicked Item:', clickedItem);
            setDisplayCardInfo(true);            
            

            //populate edit fields
            

        }
        else{
            isMounted.current = true;
        }
        

            //Auto populate text forms in edit field
            // setUpdate_item_name(clickedItem[0].item_name);
            // console.log('Updated Item Name Value:', update_item_name);
            // setUpdate_description(clickedItem[0].description);
            // setUpdate_item_name(clickedItem[0].item_name);
            

    },[clickedItem])

    const handleInfoClose = () =>{
        setDisplayCardInfo(false);

    }

    return(
        <Container>

            <Container>
                    <Box >
                        <Typography>
                            Items
                        </Typography>
                        

                    </Box>

            </Container>

            <Container>                 
                        <Typography>
                            Item List
                        </Typography>

                        <Grid container spacing={4}>
                            {itemList.map((element) => {
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

            {/** MODAL FOR GETTING DETAILED INFORMATION */}

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

export default Guest;