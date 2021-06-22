import React, { useState } from "react";

function SetPriceAndLanguage({setPriceAndLanguage}) {

  const clickHandler = ()=>{
    setPriceAndLanguage(true)
  }

  return (
    <div>
      <div>price/hour</div>
      <div>language</div>
      <div>put   /api/translators/:id,    価格と言語を登録</div>
      <button onClick={clickHandler}>登録</button>
    </div>
  );
}

export default SetPriceAndLanguage;