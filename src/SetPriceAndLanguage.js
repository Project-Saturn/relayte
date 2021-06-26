import React, { useState , useInput } from "react";
import axios from "axios";

function SetPriceAndLanguage({setPriceAndLanguage,user}) {

  const useInput = initialValue => {
    const [value, set] = useState(initialValue)
    return { value, onChange: (e) => set(e.target.value) }
  };

  const price = useInput("");
  const languages = useInput("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(price);
    console.log(languages.value);

    await axios.post('http://localhost:5000/api/translators',{
      
      "translator": {
        "name": `${user.displayName}`,
        "google_id": `${user.providerData[0].uid}`,
        "email": `${user.email}`,
        "price": Number(price.value),
        "languages":[languages.value]
      }
      
    })

    setPriceAndLanguage(true)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Please enter your fee per hour and spoken languages</div>
      <label>
        price/hour:
        <input type="text" {...price} />
      </label>
      <label>
        languages:
        <input type="text" {...languages} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default SetPriceAndLanguage;