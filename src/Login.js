import React from "react";

function Login({setLogin,setIsCustomer}) {
  const [val, setVal] = React.useState('true');

  const handleChange = e => {
    setVal(e.target.value);
    e.target.value === "true" ? setIsCustomer(true) : setIsCustomer(false)
  }

  const clickHandler = ()=>{
    setLogin(true)
  }

  return (
    <div>
      

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

export default Login;