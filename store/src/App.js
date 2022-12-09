import './App.css';
import config from './config'
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';





import Home from './components/Home';
import InventoryManager from './components/InventoryManager';
import Guest from './components/Guest'
import Header from './components/Header';

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App() {
  let [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div className="App">
      <Context.Provider value={{loggedInUser, setLoggedInUser}}>
        
      <BrowserRouter>
        <Header />
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
