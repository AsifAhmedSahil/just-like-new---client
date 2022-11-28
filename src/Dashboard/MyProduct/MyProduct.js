import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";
import ConfirmationModal from "../../Pages/Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Pages/Shared/Loading/Loading";

const MyProduct = () => {
  const [ deletingProduct,setDeletingProduct] = useState(null)

  const closeModal = () =>{
    setDeletingProduct(null)
  }

  

  
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const { data: products =[] ,refetch,isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://assignment-12-final-server.vercel.app/products?email=${user.email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        // console.log(data);
        return data;
      } catch (error) {}
    },
  });
  // console.log(products);

  const { data: booking =[] 
  } = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://assignment-12-final-server.vercel.app/booking",
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        // console.log(data);
        return data;
      } catch (error) {}
    },
  });

  // console.log(booking);

  const paid  = booking.filter(book => book.paid === true);
  console.log(paid)

  

  
  

    



  

  

  const handleAdvertize = id =>{
    // console.log(id)
    fetch(`https://assignment-12-final-server.vercel.app/products/${id}`,{
      method:"PUT",
      headers:{
          authorization: `bearer ${localStorage.getItem('accessToken')}`
      }

  })
  .then(res => res.json())
  .then(data => {
      toast.success("Check Advertize Section! ☪ ")
      console.log(data);
      refetch();
  })
  
  }

  const handleDelete = product => {
    fetch(`https://assignment-12-final-server.vercel.app/products/${product._id}`,{
        method:"DELETE",
        headers:{
          authorization: `bearer ${localStorage.getItem("accessToken")}`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.deletedCount > 0){
          refetch()
          // toast("Data Deleted Successfully")
        }
        
      })
    // console.log(products)
  }

  //   if(isLoading){
  //     return <Loading/>
  //   }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Advertize</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products?.map((product, i) => (
                <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded-xl">
                        <img src={product.img} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.email}</td>
                  <td>
                  {
                    product?.paid !== true &&
                    
                    <button className="btn btn-cyan-800 text-white  btn-sm rounded">Available</button> 
                    // <button className="btn btn-cyan-800 text-white btn-sm rounded">Sold</button>
                  }
                  {
                    product?.paid === true && 
                    <button className="btn bg-green-600 text-white btn-sm rounded">Sold</button>
                  }
                  
                  </td>

                  <td>
                    {
                      product?.advertize !== "advertize" ?

                      <button onClick={()=>handleAdvertize(product._id)} className="btn btn-cyan-800 text-white btn-sm rounded">Advertise</button>
                      : 
                      <button onClick={()=>handleAdvertize(product._id)} className="btn disabled btn-sm rounded bg-yellow-200 text-black hover:text-white">Advertized</button>
                    }
                    </td>
                  
                  <td>
                  <label onClick={()=>setDeletingProduct(product)} 
                  htmlFor="confirmation-modal" 
                  className="btn btn-error btn-sm rounded">
                  Delete
      </label>
                    
                  </td>
                </tr>
              ))}

              

            
          </tbody>
        </table>
      </div>
      {
        deletingProduct && <ConfirmationModal
        title={`Are You sure you want to delete? `}
        closeModal={closeModal}
        modalData = {deletingProduct}
        sucessAction={handleDelete}
        />
      }
    </div>
  );
};

export default MyProduct;
