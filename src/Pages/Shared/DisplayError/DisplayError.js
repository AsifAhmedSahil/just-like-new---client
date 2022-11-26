import React, { useContext } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthProvider'


const DisplayError = () => {
    const error = useRouteError()
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = ()=>{
        logout()
        .then(()=>{
            navigate("/login")
        })
        .catch(error => console.log(error));
      }

  return (
    
    <div className='text-center text-3xl m-6'>
        <p className='text-red-500 font-bold m-6'>Some Thing Went Wrong</p>
        <p className='text-red-400 m-6'>{error.statusText || error.message}</p>
        <h4 className='btn rounded text-white m-6'><button onClick={handleLogout} to="/login">Sign Out</button></h4>
    </div>
  )
}

export default DisplayError