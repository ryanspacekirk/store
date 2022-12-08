import { Card, Paper, Box, Typography, Grid, CardActionArea } from "@mui/material";


const truncatedDescription = (longDescription) => {
    let miniDescription;
    if(typeof longDescription === 'string'){
        
        if(longDescription.length < 100){
            miniDescription = longDescription;
        }
        else {
            miniDescription = longDescription.slice(0, 96)+ '...';

        }

    }
    
        // if(longDescription.length < 100 ){
        //     miniDescription = longDescription;
        // }



    return miniDescription;

}

const cardClicked = (setCardClicked_id, itemid) => {
    console.log('Card Clicked');
    setCardClicked_id(itemid);
}

const Item = ({item, setClickId}) => {
    
   
    
    return(
        <Grid item xs={4} md={3}>
            <Paper>
                <Card>
                    <CardActionArea onClick={(e) => cardClicked(setClickId, item.id)}>

                    
                        <Box>
                            <Typography variant="h6">
                                Item: {item.item_name}
                            </Typography>

                            <Box>
                                <Typography variant="h7">
                                    Description: {truncatedDescription(item.description)}
                                </Typography>
                                <Box>
                                <Typography variant="h7">
                                    Quantity: {item.quantity}
                                </Typography>

                                </Box>
                                

                            </Box>

                        </Box>
                    </CardActionArea>
                </Card>
            </Paper>

        </Grid>
        
    )

    


}

export default Item;