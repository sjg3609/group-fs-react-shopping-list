import axios from 'axios';

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
            <div className="shoppingItem">
                <h3>{item.name}</h3>
                <p>{item.quantity} {item.unit}</p>
                <button onClick={ (e) => buyItem()}>Buy</button>
                <button onClick={ (e) => removeItem()}>Remove</button>
            </div>
        );
    } else {
        return (
            <div className="shoppingItem">
                <h3>{item.name}</h3>
                <p>{item.quantity} {item.unit}</p>
                <p>Purchased</p>
            </div>
        );
    }
}

export default ShoppingItem;