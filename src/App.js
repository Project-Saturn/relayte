import './App.css';
import Customer from './Customer';
import Translator from './Translator';
import Login from './Login';
import React, { useEffect, useState } from "react";

function App() {
const[login,setLogin] = useState(false)
const[isCustomer,setIsCustomer] = useState(true)

  return (
    <div className="App">
      <header className="App-header">
        {login === false ?(
        <Login 
          setLogin={setLogin} 
          setIsCustomer={setIsCustomer}
        />) 
        : (
          <div>
            {isCustomer === true ?(
              <Customer />)
              : (
                <Translator/>
              )}


          </div>
        )}


      </header>
    </div>
  );
}

export default App;
