import axios from 'axios';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function ShoppingListForm({fetchShoppingList}) {

    let [itemName, setItemName] = useState('');
    let [itemQuantity, setItemQuantity] = useState('');
    let [itemUnit, setItemUnit] = useState('');

      const addShoppingItem = (event) => {
        event.preventDefault();
        axios.post('/shopping-list', {
            name: itemName,
            quantity: itemQuantity,
            unit: itemUnit,
        }).then((response) => {
            setItemName('');
            setItemQuantity('');
            setItemUnit('');
            fetchShoppingList();
        }).catch((error) => {
            console.log(`Error is POST ${error}`);
            alert('something went wrong in POST');
        })
        
    }

    return (
        <div className="ShoppingForm">
            <Box sx={{'& .MuiTextField-root': { m: 2, width: '25ch' },}} component="form" onSubmit={addShoppingItem}>
                <TextField variant="standard" value={itemName} onChange={(event) => setItemName(event.target.value)} placeholder="Item"/>
                <TextField type="number" variant="standard" value={itemQuantity} onChange={(event) => setItemQuantity(event.target.value)} placeholder="Quantity"/>
                <TextField variant="standard" value={itemUnit} onChange={(event) => setItemUnit(event.target.value)} placeholder="Units"/>
                <TextField type="submit" size="small" value="Save"/>
            </Box>
        </div>
    )
}

export default ShoppingListForm;