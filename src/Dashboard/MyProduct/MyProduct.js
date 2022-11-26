import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
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
  const {
    data: products =[] ,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/products?email=${user.email}`,
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
  console.log(products);

  const handleDelete = product => {
    fetch(`http://localhost:5000/products/${product._id}`,{
        method:"DELETE",
        headers:{
          authorization: `bearer ${localStorage.getItem("accessToken")}`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        refetch()
      })
    console.log(products)
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
                  <label onClick={()=>setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-error btn-sm rounded">
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
