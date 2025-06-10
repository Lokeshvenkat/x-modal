import React, { useState } from 'react';
import Modal from './components/Modal';
import './App.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Form</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
