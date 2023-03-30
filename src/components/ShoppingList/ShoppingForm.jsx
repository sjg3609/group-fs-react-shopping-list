import axios from 'axios';
import {useState, useEffect} from 'react';

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
        <form onSubmit={addShoppingItem}>
            <input type="text" value={itemName} onChange={(event) => setItemName(event.target.value)} placeholder="Item"/>
            <input type="number" value={itemQuantity} onChange={(event) => setItemQuantity(event.target.value)} placeholder="Quantity"/>
            <input type="text" value={itemUnit} onChange={(event) => setItemUnit(event.target.value)} placeholder="Units"/>
            <br/>
            <input type="submit" value="Save"/>
        </form>
    )
}

export default ShoppingListForm;