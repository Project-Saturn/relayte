import React from "react";
import axios from "axios";

function CurrentTranslator({setCurrentTranslator}) {

  const clickHandler = async ()=>{
    await axios.post('http://localhost:5000/api/reservations',{
      
        //c_id,t_idは上から持ってくる　s_time,d_minuteはここで取得
        
          "reservation": {
              "customer_id": "51bbc994-21c9-4151-b4d1-eccf6d3b5f11",
              "translator_id": "12302b59-6b8e-49bc-a4be-5e1ee173ba4e",
              "start_time": "today",
              "duration_minutes": 90,
              "url": "https://www.testmeeting.com"
          }
      
    
    })
    setCurrentTranslator(null)
  }

  return (
    <div>
      <div>日付、時間</div>
      <div>新規予約作成</div>
      <button onClick={clickHandler}>send</button>
    </div>
  );
}

export default CurrentTranslator;