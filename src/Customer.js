import React, { useState } from "react";
import Reservation from "./Reservation";
import CurrentTranslator from "./CurrentTranslator";
import { assertExpressionStatement } from "@babel/types";
import axios from "axios"

function Customer() {
  const[isDefault,setIsDefault]=useState(true)
  const[currentTranslator,setCurrentTranslator]=useState(null)
  const[translators,setTranslators]=useState(["a"])

  const clickHandler = ()=>{
    setIsDefault(false)
  }

  const clickSelectHandler = ()=>{
    setCurrentTranslator("this translator")
  }

  const getTranslator = async ()=>{
    await axios.get('http://localhost:5000/api/translators').then(d=>{
      console.log(d.data)
      setTranslators(d.data)
    })
  }

  React.useEffect(() => {
    getTranslator()
  },[]);

  return (
    <div>
      {isDefault === true ? (
        <div>
          {currentTranslator===null? (
            <div>
              <div>all translators here</div>
              <div>get   /api/translator</div>
              <div>{JSON.stringify(translators)}</div>
              <div>翻訳者を選んだらsetCurrentTranslator()でいれる</div>
              <button onClick={clickSelectHandler}>select this translator</button>
              <button onClick={clickHandler}>reservation</button>
            </div>
          ): (
            <div>
              <CurrentTranslator setCurrentTranslator={setCurrentTranslator}/>
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