import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal/ConfirmationModal'

const AllUsers = () => {
  const [ deletingUser,setDeletingUser] = useState(null)

  const closeModal = () =>{
    setDeletingUser(null)
  }

  
    const { data:userData = [] ,refetch} = useQuery({
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
  return (
    <div>
        <div className="overflow-x-auto">
  <table className="table w-full">
   
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      
     {
        userData.map((user,i)=> <tr key={userData._id}>
        <th>{i+1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
        <label onClick={()=>setDeletingUser(user)} htmlFor="confirmation-modal" className="btn btn-error btn-sm rounded">
        DELETE
      </label>
         
          </td>
      </tr>)
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