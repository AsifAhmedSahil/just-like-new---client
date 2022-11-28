import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";


const ProductCard = ({ product,setProduct }) => {
  const [verified,setVerified] = useState("")

  




  const {name,img,OriginalPrice,resellPrice,location,Uses,date,sellerName,_id,email} = product;


//   const { data:userData } = useQuery({
//     queryKey:['user'],
//     queryFn: async ()=>{
//         const res = await fetch(`http://localhost:5000/user/seller?email=${email}`,{
//           headers:{
//             authorization: `bearer ${localStorage.getItem("accessToken")}`
//           }
//         })
//         const data = await res.json()
//         console.log(data)
//         return data; 
//     }
// })

console.log("prodiuct card",email);

useEffect(()=>{
  fetch(`http://localhost:5000/user/seller/${email}`,{
              headers:{
                authorization: `bearer ${localStorage.getItem("accessToken")}`}
              })
              .then(res => res.json())
              .then(data => setVerified(data))
},[email])


// console.log(userData);

  const handleReport = id =>{
    console.log(id);
    fetch(`https://assignment-12-final-server.vercel.app/product/${id}`,{
      method:"PUT",
      headers:{
          authorization: `bearer ${localStorage.getItem('accessToken')}`
      }

  })
  .then(res => res.json())
  .then(data => {
      // toast.success("Check Advertize Section! ☪ ")
      console.log(data);
      // refetch();
  })
  }
  return (
    <div>
      
      <div className="card shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={img}
            alt="Shoes"
            className="rounded-xl w-72 h-48"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Brand: {name}</h2>
          if(verified === "true"){
            <p className="font-bold">Seller Name: {sellerName} 
               <span> ✅ </span>
            </p>
           
          }
          
          
          <p>Original Price: {OriginalPrice}</p>
          <p>Resell Price: {resellPrice}</p>
          <p>Location: {location}</p>
          <p>Uses: {Uses}</p>
          <p>Posted Date: {date}</p>
          <div className="card-actions">
            
            <label htmlFor="booking-modal" 
            onClick={()=>setProduct(product)}
            className="btn btn-primary">Book Now</label>
            <button onClick={() => handleReport(_id)} className="btn rounded">Report to admin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
