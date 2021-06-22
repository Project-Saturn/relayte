import React from "react";

function Reservation({setIsDefault}) {

  const clickHandler = ()=>{
    setIsDefault(true)
  }

  return (
    <div>
      <div>Reservations here</div> 
      <div>get   /api/reservation/:id</div>
      <button onClick={clickHandler}>もどる</button>
    </div>
  );
}

export default Reservation;