/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useMemo, useCallback, useState } from 'react'
import './App.css'

// Child component using React.memo to prevent re-renders when props don't change
const ExpensiveList = React.memo(({ items, onItemClick }) => {
  console.log('ExpensiveList rendering');
  
  return (
    <div className="list-container">
      <h3>Item List (Memoized Component)</h3>
      <ul className="list">
        {items.map((item) => (
          <li 
            key={item.id} 
            onClick={() => onItemClick(item.id)}
            className="list-item"
          >
            {item.name} - Cost: ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
});

// This one will re-render every time the parent component re-renders
const ExpensiveList2 = ({ items, onItemClick }) => {
  console.log('ExpensiveList2 rendering');
  
  return (
    <div className="list-container">
      <h3>Item List (Non-Memoized Component)</h3>
      <ul className="list">
        {items.map((item) => (
          <li 
            key={item.id} 
            onClick={() => onItemClick(item.id)}
            className="list-item"
          >
            {item.name} - Cost: ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Stats component also using React.memo
const Stats = React.memo(({ totalPrice, itemCount }) => {
  console.log('Stats rendering');
  
  return (
    <div className="stats-container">
      <h3>Stats (Memoized Component)</h3>
      <p>Total Items: {itemCount}</p>
      <p>Total Price: ${totalPrice}</p>
    </div>
  );
});

// This one will re-render every time the parent component re-renders
const Stats2 = ({ totalPrice, itemCount }) => {
  console.log('Stats2 rendering');
  
  return (
    <div className="stats-container">
      <h3>Stats (Non-Memoized Component)</h3>
      <p>Total Items: {itemCount}</p>
      <p>Total Price: ${totalPrice}</p>
    </div>
  );
};

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Tablet', price: 399 }
  ]);
  
  const [darkMode, setDarkMode] = useState(false);
  const [count, setCount] = useState(0);
  
  // Using useMemo to calculate derived values
  const totalPrice = useMemo(() => {
    console.log('Calculating total price...');
    return items.reduce((total, item) => total + item.price, 0);
  }, [items]); // Only recalculate when items change
  
  // Using useCallback to memoize event handler
  const handleItemClick = useCallback((id) => {
    console.log(`Item clicked: ${id}`);
    // Do something with the clicked item
    setCount(prevCount => prevCount + 1);
  }, []); // Empty dependencies means this function is created once
  
  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>React Optimization Demo</h1>
      <p>Click Counter: {count}</p>
      
      <button 
        onClick={() => setDarkMode(prev => !prev)}
        className="toggle-button"
      >
        Toggle Theme
      </button>
      
      <div className="content">
        {/* These components won't re-render when darkMode changes */}
        <ExpensiveList2 
          items={items} 
          onItemClick={handleItemClick} 
        />
        
        <Stats2 
          totalPrice={totalPrice} 
          itemCount={items.length} 
        />
      </div>
    </div>
  );
}

export default App
