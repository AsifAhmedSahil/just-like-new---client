import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal/ConfirmationModal'

const AllSellers = () => {
  const [ deletingUser,setDeletingUser] = useState(null)
  // AllSellers
  const closeModal = () =>{
    setDeletingUser(null)
  }

  // const[userData,setUserData] = useState([])

  
    const { data:userData = [] ,refetch} = useQuery({
    // const { data:Data = [] ,refetch} = useQuery({
        queryKey:['users'],
        queryFn: async ()=>{
            const res = await fetch('http://localhost:5000/users',{
              headers:{
                authorization: `bearer ${localStorage.getItem("accessToken")}`
              }
            })
            const data = await res.json()
            return data; 
        }
    })

    



    const handleDelete = user => {
      fetch(`http://localhost:5000/users/${user._id}`,{
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
      console.log(user);
    }

    const handleVerify = id =>{

      // console.log(id)
      fetch(`http://localhost:5000/users/${id}`,{
        method:"PUT",
        headers:{
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
  
    })
    .then(res => res.json())
    .then(data => {
        toast.success("Verified! ☪ ")
        console.log(data);
        refetch();
        
    })

    }

    // console.log(userData,"sahil");
  return (
    <div>
        <div className="overflow-x-auto">
  <table className="table w-full">
   
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Email</th>
        <th>Verify</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      
     { 
        userData.map((user,i)=> {
          return (
            user?.role === "Seller" && 
            <tr key={userData._id}>
            
            <td>
              {user.name}
              {
              user?.verify === "verified" &&
              <span> ✅ </span>
            }
              </td> 
            
            <td>{user.email}</td>
            <td>
              {
                user?.verify !== "verified" ?
                <button onClick={()=>handleVerify(user._id)} className='btn btn-sm bg-green-700 text-white rounded'>Verify</button>
                : 
                <p>Verified 🙂 </p>

              }
            </td>
            
            <td>{user.role}</td>
            <td>
            <label onClick={()=>setDeletingUser(user)} htmlFor="confirmation-modal" className="btn btn-error btn-sm rounded">
            DELETE
          </label>
             
              </td>
          </tr>
          )
        }

      //   <tr key={userData._id}>
      //   <th>{i+1}</th>
      //   <td>{user.name}</td>
      //   <td>{user.email}</td>
      //   <td>{user.role}</td>
      //   <td>
      //   <label onClick={()=>setDeletingUser(user)} htmlFor="confirmation-modal" className="btn btn-error btn-sm rounded">
      //   DELETE
      // </label>
         
      //     </td>
      // </tr>

      
      
      )
     }
    
    </tbody>
  </table>
</div>
{
  deletingUser && <ConfirmationModal
   title={`Are You sure you want to delete? `}
   closeModal={closeModal}
   modalData = {deletingUser}
   sucessAction={handleDelete}
  />
}
    </div>
  )
}

export default AllSellers