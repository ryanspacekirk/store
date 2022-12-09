import { Box, Typography, Modal, Container, Stack, TextField, Grid } from '@mui/material';

import React, { useEffect, useState, useRef} from 'react';
import config from '../config'

import { Context } from '../App.js';

import Item from './Item.js';

import axios from 'axios';

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;




const itemsPull = async(setItemList) => {
    
    let itemsFromServer = await axios.get(ApiUrl + '/items');    
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
            
            setDisplayCardInfo(true);            
        }
        else{
            isMounted.current = true;
        }

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
                  
                     </Box>  


                </Modal>

        </Container>
        
    )


}

export default Guest;