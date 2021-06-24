import React from "react";
import axios from "axios"

function Login({setLogin,setIsCustomer,user}) {
  const [val, setVal] = React.useState('true');
  
  const gId= user.providerData[0].uid
  
  const handleChange = e => {
    setVal(e.target.value);
    e.target.value === "true" ? setIsCustomer(true) : setIsCustomer(false)
  }

  const createCustomer = async()=>{
    console.log("create")
    await axios.post('http://localhost:5000/api/customers',{
       
          "customer": {
              "name": `${user.displayName}`,
              "google_id": `${gId}`,
              "email": `${user.email}`
          }
       
    })
  }

  const clickHandler = async()=>{
    setLogin(true)
    if(val) {
      
      await axios.get(`http://localhost:5000/api/customers/google/${gId}`).then(d=>{
        
        
        if(!!d.data){
          createCustomer()
        }
        
      })



      
    }
  }

  return (
    <div>
      
      <div>{user.displayName}</div>

      <label>
        <input
          type="radio"
          value="true"
          onChange={handleChange}
          checked={val === 'true'}
        />
        Customer
      </label>
      <label>
        <input
          type="radio"
          value="false"
          onChange={handleChange}
          checked={val === 'false'}
        />
        Translator
      </label>
      <p></p>
      <button onClick={clickHandler}>Login</button>
    </div>
  );
}

export default Login