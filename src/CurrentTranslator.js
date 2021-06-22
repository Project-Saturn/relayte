import React from "react";

function CurrentTranslator({setCurrentTranslator}) {

  const clickHandler = ()=>{
    // post   api/reservations
    setCurrentTranslator(null)
  }

  return (
    <div>
      <div>日付、時間</div>
      <div>post   api/reservations,　新規予約作成</div>
      <button onClick={clickHandler}>send</button>
    </div>
  );
}

export default CurrentTranslator;