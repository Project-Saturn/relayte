import React, { useState , useInput ,useEffect} from "react";
import axios from "axios";

function CurrentTranslator({uuid,currentTranslator,setCurrentTranslator}) {
  const[userUuid,setUserUuid]=useState("")

  const useInput = initialValue => {
    const [value, set] = useState(initialValue)
    return { value, onChange: (e) => set(e.target.value) }
  };

  const time = useInput("");
  const duration = useInput("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    // console.log(time.value);
    // console.log(duration.value);
    // console.log("currentTranslator",currentTranslator)
    // console.log("uuid",uuid)
    
    console.log("id",userUuid)

    await axios.post('http://localhost:5000/api/reservations',{
      
  //       //c_id,t_idは上から持ってくる　s_time,d_minuteはここで取得
        
          "reservation": {
              "customer_id": `${userUuid}`,
              "translator_id": `${currentTranslator}`,
              "start_time": `${time.value}`,
              "duration_minutes": Number(duration.value),
              "url": "https://www.testmeeting.com"
          }
      
    
    })
    

    setCurrentTranslator(null)
  };

  const returnHandler = ()=>{
    setCurrentTranslator(null)
  }

  const getUuid = async()=>{
    await axios.get(`http://localhost:5000/api/customers/google/${uuid}`).then(d=>{
      console.log("a",d.data[0].id)
      setUserUuid(d.data[0].id)
    })
  }

  useEffect(()=>{
    getUuid()
  },[])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>Please input your start date and time and duration of reservation</div>
        <label>
          start time:
          <input type="text" {...time} />
        </label>
        <label>
          duration (min):
          <input type="text" {...duration} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={returnHandler}>Back</button>
    </div>
  );

















}

export default CurrentTranslator;