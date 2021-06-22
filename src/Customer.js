import React, { useState } from "react";
import Reservation from "./Reservation";
import CurrentTranslator from "./CurrentTranslator";

function Customer() {
  const[isDefault,setIsDefault]=useState(true)
  const[currentTranslator,setCurrentTranslator]=useState(null)

  const clickHandler = ()=>{
    setIsDefault(false)
  }

  const clickSelectHandler = ()=>{
    setCurrentTranslator("this translator")
  }


  return (
    <div>
      {isDefault === true ? (
        <div>
          {currentTranslator===null? (
            <div>
              <div>all translators here</div>
              <div>get   /api/translator</div>
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