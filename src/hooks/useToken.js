import { useEffect, useState } from "react";

const useToken = email =>{
    // console.log(email);
    const [token,setToekn] = useState("");
    useEffect(()=>{
        if(email){
            fetch(`http://localhost:5000/jwt?email=${email}`)
    .then(res =>res.json())
    .then(data => {
      console.log("usetoken",data)
      if(data.accessToken){
        localStorage.setItem("accessToken",data.accessToken);
        // navigate("/")
        setToekn(data.accessToken)
      }
    })
        }
    },[email]);
    return [token]
  }

  export default useToken;