import React, { useState } from "react";
import Reservation from "./Reservation";

function Customer() {
  const[isDefault,setIsDefault]=useState(true)
  const[currentTranslator,setCurrentTranslator]=useState(null)

  const clickHandler = ()=>{
    setIsDefault(false)
  }


  return (
    <div>
      {isDefault === true ? (
        <div>
          {currentTranslator===null? (
            <div>
              <div>all translators here</div>
              <div>get   /api/translator</div>
              <button onClick={clickHandler}>reservation</button>
            </div>
          ): (
            // <Yoyaku/>
            <div>a</div>
          )}
          <div>all translators here</div>
          <div>get   /api/translator</div>
          <button onClick={clickHandler}>reservation</button>
        </div>
      ): (
        <Reservation setIsDefault={setIsDefault}/>  
      )}
    </div>
  );
}

export default Customer;