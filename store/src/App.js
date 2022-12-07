import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import InventoryManager from './components/InventoryManager';
import Guest from './components/Guest'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/InventoryManager' element={<InventoryManager />} />
          <Route path='/Guest' element={<Guest />} />





        </Routes>  
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
