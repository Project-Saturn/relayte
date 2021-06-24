import React, { useState } from "react";
import Reservation from "./Reservation";
import axios from "axios";

function Translator({user}) {
  const[isDefault,setIsDefault]=useState(true)
  const[reservations,setReservations]=useState([])
  const[myUuid,setMyUuid]=useState("")

  const tmp=[]

  const clickHandler = ()=>{
    setIsDefault(false)
  }

  const getReservations = async ()=>{
    await axios.get('http://localhost:5000/api/reservations').then(d=>{
      console.log(d.data)
      return d.data
    })
    .then(data=>{
      data.forEach(element => {
        // console.log(element.id,element.accepted,element.start_time,element.duration_minutes,element.customer_id,element.translator_id)
        //if(element.translator_id===getuuid() && element.accepted===null){
        //  element を格納　＆表示
        //}
        if(element.translator_id===myUuid && element.accepted===null){
          tmp.push(element)
        }
      });
    })
    setReservations(tmp)
    
  }

  const getUuid=async()=>{
    console.log("my g-id",user.providerData[0].uid)
    await axios.get(`http://localhost:5000/api/translators/google/${user.providerData[0].uid}`).then(d=>{
      console.log(d.data[0].id)
      setMyUuid(d.data[0].id)
      
    })
  }

  React.useEffect(() => {
    getReservations()
    getUuid()
  },[]);

  return (
    <div>
      {isDefault === true ? (
        <div>
          <div>all offers here</div>
          <div>{JSON.stringify(reservations)}</div>

          <div>put   /api/reservations/:id</div>
          <div>accept のbool値をtrue or false に</div>
          <button onClick={clickHandler}>reservation</button>
        </div>
      ): (
        <Reservation setIsDefault={setIsDefault}/>  
      )}
    </div>
  );
}

export default Translator;