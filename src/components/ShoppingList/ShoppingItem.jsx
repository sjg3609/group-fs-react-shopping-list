import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

function ShoppingItem({ item, fetchShoppingList }) {
    
    const removeItem = (e) => {
        axios.delete(`/shopping-list/${item.id}`).then((response) => {
            console.log(response);
            fetchShoppingList();
        }).catch((error) => {
            console.log('Error in removeItem ' + error);
            alert('Something went wrong.');
        })
    }
    
    const buyItem = (e) => {
        axios.put(`/shopping-list/${item.id}`).then((response) => {
            console.log(response);
            fetchShoppingList();
        }).catch((error) => {
            console.log(`Error in buyItem ${error}`);
            alert('Something went wrong in buyItem!');
        });
    }
    
    if(item.purchased === false) {
        return (
            <Grid direction="row" item sm={4} md={2}>
                <Card sx={{ maxWidth: 275 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {item.name}
                        </Typography>
                        <Typography color="text-secondary">
                            {item.quantity} {item.unit}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Stack direction="row" spacing={2}>
                            <Button onClick={ (e) => buyItem()}>Buy</Button>
                            <Button onClick={ (e) => removeItem()}>Remove</Button>
                        </Stack>
                    </CardActions>
                </Card>
            </Grid>
        );
    } else {
        return (
            <Grid direction="row" item sm={4} md={2}>
                <Card sx={{ maxWidth: 275 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {item.name}
                        </Typography>
                        <Typography color="text-secondary">
                            {item.quantity} {item.unit}
                        </Typography>
                        <CardActions>
                            <div className="typographyDiv">
                                <Typography variant="subtitle1">
                                     Purchased
                                </Typography>
                            </div>
                            
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default ShoppingItem;