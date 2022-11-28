import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider'

const MyOrder = () => {
    const {user} = useContext(AuthContext)

    // const url = `https://assignment-12-final-server.vercel.app/bookings?email=${user?.email}`

    const {data: bookings = []} = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async () =>{
            const res = await fetch(`https://assignment-12-final-server.vercel.app/bookings?email=${user?.email}`,{
                headers:{
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    console.log(bookings.length);
  return (
    <div>
        <h3 className="text-3xl">My Orders</h3>

        <div className="overflow-x-auto">
  <table className="table w-full">
   
    <thead>
      <tr>
        <th></th>
        <th>Product</th>
        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>Price</th>
        <th>Pay</th>
      </tr>
    </thead>
    <tbody>
     
      {
        bookings?.length &&
        bookings?.map((booking,i) => <tr key={booking._id}>
            <th>{i+1}</th>
            <td>{booking.product} </td>
            <div className="avatar">
  <div className="w-24 rounded-xl">
    <img src={booking.img} alt=''/>
  </div>
</div>
            <td>{booking.user}</td>
            <td>{booking.email}</td>
            <td>৳{booking.price}</td>
            <td>
              {
                booking.price && !booking.paid && 
                <Link to={`/dashboard/payment/${booking._id}`}>
                  <button className='btn btn-primary rounded'>PAY</button>
                </Link>
              }
              {
                booking.price && booking.paid && <span className='text-green-600 font-semibold '>Paid</span>
              }
            </td>

          </tr>)
      }
      
    </tbody>
  </table>
</div>
    </div>
  )
}

export default MyOrder