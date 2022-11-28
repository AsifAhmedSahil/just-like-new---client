import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal/ConfirmationModal'
// import axios from 'axios';

const AllUsers = () => {
  const [ deletingUser,setDeletingUser] = useState(null)
  // AllSellers
  const closeModal = () =>{
    setDeletingUser(null)
  }

  // const [userData,setUserData] = useState([])
  
    const { data:userData = [] ,refetch} = useQuery({
    // const { data:userData = [] ,refetch} = useQuery({
        queryKey:['users'],
        queryFn: async ()=>{
            const res = await fetch('https://assignment-12-final-server.vercel.app/users',{
              headers:{
                authorization: `bearer ${localStorage.getItem("accessToken")}`
              }
            })
            const data = await res.json()
            return data; 
        }
    })

    // axios use 
    // axios.get("https://assignment-12-final-server.vercel.app/users")
    // .then(res => 
    //   setUserData(res.data)
      
    //   )

    console.log(userData)


    const handleDelete = user => {
      fetch(`https://assignment-12-final-server.vercel.app/users/${user}`,{
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
  return (
    <div>
        <div className="overflow-x-auto">
  <table className="table w-full">
   
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      
     {
        userData.map((user,i)=> {
          return (
            user?.role === "Buyer" && 
            <tr key={user._id}>
            {/* <th>{i+1}</th> */}
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
            <label onClick={()=>setDeletingUser(user._id)} 
            htmlFor="confirmation-modal" className="btn btn-error btn-sm rounded">
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

export default AllUsers