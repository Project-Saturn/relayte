import React, { useEffect, useState } from 'react';
import axios from "axios";

function Reservation({isCustomer,userUuid,setIsDefault}) {

  const [reservation,setReservation]=useState([])
  const reservations=[]

  const clickHandler = ()=>{
    
    console.log(isCustomer,reservations)
   
    setIsDefault(true)
  }
  const clickHandler2 = ()=>{
    
    
    setReservation(reservations)
    
  }

  const getReservation = async ()=>{
    if(isCustomer){
      userUuid.forEach(async(id)=>{
        await axios.get(`http://localhost:5000/api/reservations/${id}`).then(d=>{
          reservations.push(d.data)
        }) 
      })
    }else{
      //translatorのreservations表示
      
      userUuid.forEach(async(id)=>{
        await axios.get(`http://localhost:5000/api/reservations/${id}`).then(d=>{
          console.log(d.data)
          if(d.data.length!==0) reservations.push(d.data)
          console.log('d.data')
          console.log(d.data)
        }) 
      })
      
    }
  }




  React.useEffect(() => {
    getReservation()

  }, []);

  return (
    <div>
      {/* <div>Reservations here</div> 
      

      <div>{JSON.stringify(reservation)}</div>
      <button onClick={clickHandler2}>リスト取得</button>
      <button onClick={clickHandler}>もどる</button> */}

<table id="simple-board">
        <tbody>
          <tr id="row0">
            <td>---Start Time---</td>
            <td>---Duration---</td>
            <td>---ID---</td>
            
          </tr>
          {reservation.map((translator) => (
          <tr id="row1">  
              <td>{translator[0].start_time}</td>
              <td>{translator[0].duration_minutes}</td>
              <td>{translator[0].id}</td>   
              
          </tr>
         ))}
        </tbody>
      </table>
      {/* <div>{JSON.stringify(reservation)}</div> */}
      <button onClick={clickHandler2}>Get Reservations</button>
      <button onClick={clickHandler}>Back</button>
    </div>
  );
}

export default Reservation;
