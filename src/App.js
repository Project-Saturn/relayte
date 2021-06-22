import './App.css';
import Customer from './Customer';
import Translator from './Translator';
import Login from './Login';
import SetPriceAndLanguage from './SetPriceAndLanguage';
import React, { useEffect, useState } from "react";

function App() {
  const[login,setLogin] = useState(false)
  const[isCustomer,setIsCustomer] = useState(true)
  const[priceAndLanguage,setPriceAndLanguage] = useState(false)

  // const getPriceAndLanguage = () =>{
    // get  api/translator/:id 
    // price !== null && language !== null -> setPriceAndLanguage(true)
  // }




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
                <div>
                  {priceAndLanguage === false ?(
                    <div>
                      <SetPriceAndLanguage setPriceAndLanguage={setPriceAndLanguage} />
                    </div>
                  ):(
                    <Translator/>
                  )}
                  
                </div>  
              )}


          </div>
        )}


      </header>
    </div>
  );
}

export default App;
