import React, { useState } from "react";
import Reservation from "./Reservation";
import CurrentTranslator from "./CurrentTranslator";
import { assertExpressionStatement } from "@babel/types";
import axios from "axios"
function Customer({uuid}) {
  const[isDefault,setIsDefault]=useState(true)
  const[currentTranslator,setCurrentTranslator]=useState(null)
  const[translators,setTranslators]=useState(["a"])
  const clickHandler = ()=>{
    setIsDefault(false)
  }
  const clickSelectHandler = (e) => {
    console.log(e.target.id)
    setCurrentTranslator(e.target.id)
  }
  const getTranslator = async ()=>{
    await axios.get('http://localhost:5000/api/translators').then(d=>{
      console.log(d.data)
      setTranslators(d.data)
    })
  }
  React.useEffect(() => {
    getTranslator()
  }, []);
  return (
    <div>
      {isDefault === true ? (
        <div>
          {currentTranslator===null? (
            <div>
              <div>
      <table id="simple-board">
        <tbody>
          <tr id="row0">
            <td>---Name---</td>
            <td>---Languages spoken---</td>
            <td>---Rate/hour---</td>
            <td>---Book---</td>
          </tr>
          {translators.map((translator) => (
          <tr id="row1">  
              <td>{translator.name}</td>
              <td>{translator.languages}</td>
              <td>{translator.price}</td>   
              <td id="cell1-2"><button id={translator.id} onClick={clickSelectHandler}>select this translator</button></td>
          </tr>
         ))}
        </tbody>
      </table>
      </div>
              <button onClick={clickHandler}>reservation</button>
            </div>
          ): (
            <div>
              <CurrentTranslator 
              uuid={uuid}
              currentTranslator={currentTranslator}
              setCurrentTranslator={setCurrentTranslator}
              />
            </div>
          )}
        </div>
      ): (
        <Reservation setIsDefault={setIsDefault}/>  
      )}
    </div>
  );
}
export default Customer;