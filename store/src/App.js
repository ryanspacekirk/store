import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



import Home from './components/Home';
import InventoryManager from './components/InventoryManager';
import Guest from './components/Guest'

function App() {
  let [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div className="App">
      <Context.Provider value={{loggedInUser, setLoggedInUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/InventoryManager' element={<InventoryManager />} />
          <Route path='/Guest' element={<Guest />} />





        </Routes>  
      
      </BrowserRouter>

      </Context.Provider>
      
      
    </div>
  );
}

export default App;
export const Context = React.createContext();
