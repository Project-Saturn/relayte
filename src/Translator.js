import React, { useState } from "react";
import Reservation from "./Reservation";
import axios from "axios";
function Translator({uuid,user}) {
  const[isDefault,setIsDefault]=useState(true)
  const[reservations,setReservations]=useState([])
  const[myUuid,setMyUuid]=useState("")
  const[userUuid,setUserUuid]=useState([])
  const tmp=[]
  const clickHandler = ()=>{
    setIsDefault(false)
  }
  const clickHandler2 = ()=>{
    console.log(tmp)
    setReservations(tmp)
  }
  const getReservations = async ()=>{
    await axios.get('http://localhost:5000/api/reservations').then(d => {
      
      // setReservations(d.data)
      return d.data
    })
    .then(data=>{
      data.forEach(element => {
        // console.log(element.id,element.accepted,element.start_time,element.duration_minutes,element.customer_id,element.translator_id)
        //if(element.translator_id===getuuid() && element.accepted===null){
        //  element を格納　＆表示
        //}
        console.log(element.translator_id===myUuid && element.accepted===null)
        if(element.translator_id===myUuid && element.accepted===null){
          tmp.push(element)
        }
          
      });
      console.log(tmp)
      setReservations(tmp)
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
    // console.log("uuid",uuid)
    await axios.get(`http://localhost:5000/api/translators/google/${user.providerData[0].uid}`).then(d=>{
      setMyUuid(d.data[0].id)
      setUserUuid(d.data[0].reservation_ids)
    })
  }
 
  React.useEffect(() => {
    getUuid()
    getReservations()
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
          <button onClick={clickHandler2}>get List</button>
          <button onClick={clickHandler}>reservation</button>
        </div>
      ): (
        <Reservation 
        userUuid={userUuid}
        /* ↑　予約IDの配列 */
        setIsDefault={setIsDefault}
        />  
      )}
    </div>
  );
}
export default Translator;