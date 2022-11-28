import { useEffect, useState } from "react";

const useToken = email =>{
    // console.log(email);
    const [token,setToekn] = useState("");
    useEffect(()=>{
        if(email){
            fetch(`https://assignment-12-final-server.vercel.app/jwt?email=${email}`)
    .then(res =>res.json())
    .then(data => {
      console.log(data)
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