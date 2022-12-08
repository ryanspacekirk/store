import { Card, Paper, Box, Typography, Grid } from "@mui/material";
import { typography } from "@mui/system";

const truncatedDescription = (longDescription) => {
    let miniDescription;
    if(typeof longDescription === 'string'){
        console.log('Description matches type of string');
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

const Item = (prop) => {
    
    return(
        <Grid item xs={4} md={3}>
            <Paper>
                <Card>
                    <Box>
                        <Typography variant="h6">
                            Item: {prop.item.item_name}
                        </Typography>

                        <Box>
                            <Typography variant="h7">
                                Description: {truncatedDescription(prop.item.description)}
                            </Typography>
                            <Box>
                            <Typography variant="h7">
                                Quantity: {prop.item.quantity}
                            </Typography>

                            </Box>
                            

                        </Box>

                    </Box>

                </Card>
            </Paper>

        </Grid>
        
    )

    


}

export default Item;