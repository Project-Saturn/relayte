import React, { Fragment, useState } from "react";
import Reservation from "./Reservation";
import CurrentTranslator from "./CurrentTranslator";
import NavBar from "./NavBar";

const Customer = ()=>{
  const[isDefault,setIsDefault]=useState(true)
  const[currentTranslator,setCurrentTranslator]=useState(null)

  const clickHandler = ()=>{
    setIsDefault(false)
  }

  const clickSelectHandler = ()=>{
    setCurrentTranslator("this translator")
  }

  return (
    <Fragment>
    <div>
    <NavBar/>
    </div>
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
    </Fragment>
  );
}

export default Customer;