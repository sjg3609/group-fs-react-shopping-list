import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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
            <Card className="shoppingItem">
                <CardContent>
                    <Typography variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography color="text-secondary">
                        {item.quantity} {item.unit}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={ (e) => buyItem()}>Buy</Button>
                    <Button onClick={ (e) => removeItem()}>Remove</Button>
                </CardActions>
            </Card>
        );
    } else {
        return (
            <Card className="shoppingItem">
                <CardContent>
                    <Typography variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography color="text-secondary">
                        {item.quantity} {item.unit}
                    </Typography>
                    <CardActions>
                        <Typography>
                            Purchased
                        </Typography>
                    </CardActions>
                </CardContent>
            </Card>
        );
    }
}

export default ShoppingItem;