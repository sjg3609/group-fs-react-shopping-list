import React from 'react';
import ShoppingList from '../ShoppingList/ShoppingList';
import Header from '../Header/Header.jsx'
import './App.css';


function App() {
    return (
        <div className="App">
            <Header />
            
            <main>
                <ShoppingList/>
            </main>
        </div>
    );
}

export default App;
