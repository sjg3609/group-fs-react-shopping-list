import {useState, useEffect} from 'react';
import axios from 'axios';

function ShoppingList() {
    let [itemName, setItemName] = useState('');
    let [itemQuantity, setItemQuantity] = useState('');
    let [itemUnit, setItemUnit] = useState('');
    let [shoppingListArray, setShoppingListArray] = useState([]);
    
    const fetchShoppingList = () => {
        axios.get('/shopping-list').then((response) => {
            setShoppingListArray(response.data);
        }).catch((error) => {
            console.log(`Error in GET for Shopping List, ${error}`);
            alert('Something went wrong in GET!');
        });
    }

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

    useEffect(() => {
        fetchShoppingList();
    }, [])

    return (
        <div>
            <h1>Add an Item</h1>
            <form onSubmit={addShoppingItem}>
                <input type="text" value={itemName} onChange={(event) => setItemName(event.target.value)} />
                <input type="number" value={itemQuantity} onChange={(event) => setItemQuantity(event.target.value)} />
                <input type="text" value={itemUnit} onChange={(event) => setItemUnit(event.target.value)}/>
                <input type="submit" />
            </form>
            <h1>Shopping List:</h1>
            {
                shoppingListArray.map((item) => (
                    <div className="shoppingItem">
                        <h2>{item.name}</h2>
                        <p>{item.quantity} {item.unit}</p>
                    </div>
                ))
            }
        </div>
    );
        
}



export default ShoppingList;