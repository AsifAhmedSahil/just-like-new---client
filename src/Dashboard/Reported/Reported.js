import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal/ConfirmationModal';

const Reported = () => {
  const [ deletingProduct,setDeletingProduct] = useState(null)

  const closeModal = () =>{
    setDeletingProduct(null)
  }
    const {
        data: products = [],
        refetch,
        isLoading,
      } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
          try {
            const res = await fetch("https://assignment-12-final-server.vercel.app/product", {
              headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
              },
            });
            const data = await res.json();
            // console.log(data);
            return data;
          } catch (error) {}
        },
      });
      console.log(products);

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
              toast("Reported Items Deleted Successfully!")
            }
            
          })
        console.log(product)
      }

      
  return (
    <div>
        <div className="overflow-x-auto">
  <table className="table w-full">
   
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Image</th>
        
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      
      {
        products.map((product) => 
            
            
                product.report === "reported"  && 
                
                <tr key={product._id}>
            
            <td>{product.name}</td>
            <td>
            <div className="avatar">
  <div className="w-20 rounded">
    <img src={product.img}   alt=''/>
  </div>
</div>
            </td>
            <td className='text-red-600'>{product.report}</td>
            <td>
            {/* <label onClick={()=>setDeletingproduct(product)} htmlFor="confirmation-modal" className="btn btn-error btn-sm rounded"> */}
            <label  onClick={()=>setDeletingProduct(product)}
                  htmlFor="confirmation-modal" 
                  className="btn btn-error btn-sm rounded">
                  Delete
      </label>
             
              </td>
          </tr>

            )
      }
     
    </tbody>
  </table>
</div>

{
        deletingProduct && <ConfirmationModal
        title={`Are You sure you want to delete ${deletingProduct.name}? `}
        message={`if you delete ${deletingProduct.name}. It cannot be undone`}
        closeModal={closeModal}
        modalData = {deletingProduct}
        sucessAction={handleDelete} 
        />
      }

    </div>
  )
}

export default Reported