import { useQuery } from '@tanstack/react-query'
import React from 'react'

const AllUsers = () => {
    const { data:userData = [] ,refetch} = useQuery({
        queryKey:['users'],
        queryFn: async ()=>{
            const res = await fetch('http://localhost:5000/users')
            const data = await res.json()
            return data; 
        }
    })
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
        <td><button className='btn btn-xs rounded bg-red-600 text-white'>DELETE</button></td>
      </tr>)
     }
    
    </tbody>
  </table>
</div>
    </div>
  )
}

export default AllUsers