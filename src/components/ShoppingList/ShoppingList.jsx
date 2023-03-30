import {useState, useEffect} from 'react';
import axios from 'axios';
import ShoppingItem from './ShoppingItem';
import ShoppingListForm from './ShoppingForm';

function ShoppingList() {
    
    let [shoppingListArray, setShoppingListArray] = useState([]);
    
    const fetchShoppingList = () => {
        axios.get('/shopping-list').then((response) => {
            setShoppingListArray(response.data);
        }).catch((error) => {
            console.log(`Error in GET for Shopping List, ${error}`);
            alert('Something went wrong in GET!');
        });
    }

    const resetItems = (e) => {
        axios.put('/shopping-list/reset').then((response) => {
            console.log(response);
            fetchShoppingList();
        }).catch((error) => {
            console.log('Error in resetItems ' + error);
            alert('Something went wrong.');
        })
    }    
    
    useEffect(() => {
        fetchShoppingList();
    }, [])

    const clearAll = (e) => {
        axios.delete(`/shopping-list`).then((response) => {
            console.log(response);
            fetchShoppingList();
        }).catch((error) => {
            console.log(`Error in clearAll, ${error}`);
            alert('Something went wrong in clearAll!');
        });
    }


    return (
        <div>
            <h1>Add an Item</h1>
                <ShoppingListForm 
                    fetchShoppingList={fetchShoppingList}
                />
            <h1>Shopping List:</h1>
            <button onClick={ (e) => resetItems(e)}>Reset</button>
            <button onClick={(e) => {clearAll(e)}}>Clear All</button>
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