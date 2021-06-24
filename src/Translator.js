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
    await axios.get('http://localhost:5000/api/reservations').then(d => {
      setReservations(d.data)
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
   // setReservations(tmp)
  }
  const handleAccept = async e => {
    const id = e.target.id
    console.log(e.target)
    console.log("ID! "+ id)
   await axios.put(`http://localhost:5000/api/reservations/${id}`, 
    { reservation: { "accepted": true } });
  }
  const handleReject = async e => {
    const id = e.target.id
    await axios.put(`http://localhost:5000/api/reservations/${id}`, 
    { reservation: { "accepted": false } });
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
          <div>put   /api/reservations/:id</div>
          <div>accept のbool値をtrue or false に
          <table>
          <tbody>
          <tr>
            <td>---Start Time---</td>
            <td>---Duration---</td>
            <td>---Accept or Reject?---</td>
          </tr>
                {reservations.map((reservation) => (
              <tr key={reservation.id}>
              <td>{reservation.start_time}</td>
              <td>{reservation.duration_minutes}</td>
              <td><button
              id={reservation.id}  
              onClick={handleAccept}>Accept</button></td>
              <td><button
              id={reservation.id} 
              onClick={handleReject}>Reject</button></td>
          </tr>
         ))}
        </tbody>
      </table>
          </div>
          <button onClick={clickHandler}>reservation</button>
        </div>
      ): (
        <Reservation setIsDefault={setIsDefault}/>  
      )}
    </div>
  );
}
export default Translator;