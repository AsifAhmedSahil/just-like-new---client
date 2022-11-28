import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";


const ProductCard = ({ product,setProduct }) => {
  // const [user,setUser] = useState("")

//   const { data:userData = [] } = useQuery({
//     queryKey:['users'],
//     queryFn: async ()=>{
//         const res = await fetch('https://assignment-12-final-server.vercel.app/users',{
//           headers:{
//             authorization: `bearer ${localStorage.getItem("accessToken")}`
//           }
//         })
//         const data = await res.json()
//         return data; 
//     }
// })




  const {name,img,OriginalPrice,resellPrice,location,Uses,date,sellerName,_id} = product;

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
          <p className="font-bold">Seller Name: {sellerName} 
          
            </p>
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
