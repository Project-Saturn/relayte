import React, { useState , useInput } from "react";
import axios from "axios";

function SetPriceAndLanguage({setPriceAndLanguage,user}) {

  // const submitPriceAndLanguage = async ()=>{
  //   //post api/translators
    
  //   await axios.post('http://localhost:5000/api/translator',{
      
  //     "translator": {
  //       "name": `${user.displayName}`,
  //       "google_id": `${user.providerData[0].uid}`,
  //       "email": `${user.email}`,
  //       "price": 1000,
  //       "language":["japanese"]
  //     }
      
  //   })
    
  //   setPriceAndLanguage(true)
  // }

  // const submitHandler = (e) => {
  //   console.log(e)
  // }


  // return (

    
  //   <div>
  //     <form onSubmit={submitHandler}>
  //       <label>price/hour:</label>
  //         <input type="text"></input>
  //         <label>language:</label>
  //         <input type="text"></input>
  //       <div>put   /api/translators/:id,    価格と言語を登録</div>
  //       <button onClick={submitPriceAndLanguage}>登録</button>
  //   </form>
       
  //   </div>
  // );


  const useInput = initialValue => {
    const [value, set] = useState(initialValue)
    return { value, onChange: (e) => set(e.target.value) }
  };

  const name = useInput("");
  const pass = useInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(pass);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" {...name} />
      </label>
      <label>
        Pass:
        <input type="password" {...pass} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default SetPriceAndLanguage;