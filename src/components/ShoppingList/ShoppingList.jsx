import {useState, useEffect} from 'react';
import axios from 'axios';
import ShoppingItem from './ShoppingItem';

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
                <input type="text" value={itemName} onChange={(event) => setItemName(event.target.value)} placeholder="Item"/>
                <input type="number" value={itemQuantity} onChange={(event) => setItemQuantity(event.target.value)} placeholder="Quantity"/>
                <input type="text" value={itemUnit} onChange={(event) => setItemUnit(event.target.value)} placeholder="Units"/>
                <br/>
                <input type="submit" value="Save"/>
            </form>
            <h1>Shopping List:</h1>
            <button>Reset</button>
            <button>Clear All</button>
            <div id="shoppingList">
                {
                    shoppingListArray.map((item) => (
                        <ShoppingItem 
                            key = {item.id}
                            item = {item}
                            fetchShoppingList = {fetchShoppingList}
                        />
                    ))
                }
            </div>
        </div>
    );
        
}



export default ShoppingList;