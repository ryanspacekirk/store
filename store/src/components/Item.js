import { Card, Paper, Box, Typography } from "@mui/material";

const Item = (prop) => {
    
    return(
        <Paper>
        <Card>
            <Box>
                <Typography>
                    Item: {prop.item.item_name}
                </Typography>

            </Box>

        </Card>
    </Paper>

    )

    


}

export default Item;