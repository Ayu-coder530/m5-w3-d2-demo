import React, { useState, useEffect } from 'react';
import CreateList from './components/CreateList';
import Lists from './components/Lists'; // Ensure this import statement is correct
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('http://localhost:5000/items');
    const data = await response.json();
    setItems(data);
  };

  const handleCreate = async (newItem) => {
    const response = await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    const data = await response.json();
    setItems([...items, data]);
  };

  const handleUpdate = async (updatedItem) => {
    const response = await fetch(`http://localhost:5000/items/${updatedItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    setItems(items.map(item => (item.id === data.id ? data : item)));
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE',
    });
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>My List</h1>
      <CreateList handleCreate={handleCreate} />
      <Lists items={items} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

