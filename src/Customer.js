import React, { useState } from "react";
import Reservation from "./Reservation";
import CurrentTranslator from "./CurrentTranslator";
import { assertExpressionStatement } from "@babel/types";
import axios from "axios"
function Customer({isCustomer,uuid}) {
  const[isDefault,setIsDefault]=useState(true)
  const[currentTranslator,setCurrentTranslator]=useState(null)
  const[translators,setTranslators]=useState(["a"])
  const[userUuid,setUserUuid]=useState("")
  const clickHandler = ()=>{
    setIsDefault(false)
  }
  const clickSelectHandler = (e) => {
    setCurrentTranslator(e.target.id)
  }
  const getTranslator = async ()=>{
    await axios.get('http://localhost:5000/api/translators').then(d=>{
      setTranslators(d.data)
    })
  }

  const getUuid = async()=>{
    await axios.get(`http://localhost:5000/api/customers/google/${uuid}`).then(d=>{
      
      setUserUuid(d.data[0].reservation_ids)

    })
  }


  React.useEffect(() => {
    getTranslator()
    getUuid()
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
        <Reservation 
        isCustomer={isCustomer}
        userUuid={userUuid}
        setIsDefault={setIsDefault}
        />  
      )}
    </div>
  );
}
export default Customer;