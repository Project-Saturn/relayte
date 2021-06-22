import React, { useState } from "react";
import Reservation from "./Reservation";

function Translator() {
  const[isDefault,setIsDefault]=useState(true)

  const clickHandler = ()=>{
    setIsDefault(false)
  }


  return (
    <div>
      {isDefault === true ? (
        <div>
          <div>all offers here</div>
          <div>get   /api/reservayion/:translator id</div>
          <button onClick={clickHandler}>reservation</button>
        </div>
      ): (
        <Reservation setIsDefault={setIsDefault}/>  
      )}
    </div>
  );
}

export default Translator;