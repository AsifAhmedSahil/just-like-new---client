import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';

const AddProduct = () => {

    const imageHostKey = process.env.REACT_APP_imagebb_key
    const {user} = useContext(AuthContext)
    console.log("from add product",user);

    

    // const[user,setUser] = useState()

    const { data:userData = [] } = useQuery({
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

  console.log(userData)
  // console.log(user);



    const navigate = useNavigate()
    
  const { register, handleSubmit } = useForm();
  const handleProduct = data =>{
    console.log(data)
    const image = data.img[0]
    const formData = new FormData();
    formData.append("image",image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
    fetch(url,{
      method:"POST",
      body:formData
    })
    .then(res => res.json())
    .then(imgData => {
        console.log(imgData)
        if(imgData.success){
            // console.log(imgData.data.url);
            const product = {
                name: data.category,
                sellerName:data.name,
                location: data.location,
                email:data.email,
                Uses: data.Uses,
                resellPrice:data.resellPrice,
                OriginalPrice:data.OriginalPrice,
                img:imgData.data.url,
                conditions:data.conditions,
                status:data.status,
                date:data.date,
                description:data.description
                // catogory:data.catogory
              }
              // console.log(product)
             // save products info to the database
        fetch('http://localhost:5000/products',{
            method:"POST",
            headers:{
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body:JSON.stringify(product)
          })
          .then(res => res.json())
        .then(result =>{
          console.log(result);
          toast.success(`You added product successfully!`)
          navigate("/dashboard/myproduct")
        })
        }
    })
  }
  return (
     
       
      
    
    <div>
       
           <div className='w-96 p-7'>
            <h2 className="text-4xl">Add A Product</h2>
            <form onSubmit={handleSubmit(handleProduct)}>
            <div className="form-control">
                              <label className="label">
                                  <span className="label-text">Full Name</span>
                              </label>
                              <input {...register("name")} placeholder="name" className="input input-bordered" type='text' />
                          </div>

                        <div className="form-control">
                              <label className="label">
                                  <span className="label-text">Select Category</span>
                              </label>
                              <select {...register("category", { required: true })}
                                  className='input input-bordered'>
                                  <option value="Hp">Hp</option>
                                  <option value="Asus">Asus</option>
                                  <option value="Dell">Dell</option>
                              </select>
                          </div>

                          <div className="form-control">
                              <label className="label">
                                  <span className="label-text">Condition</span>
                              </label>
                              <select {...register("conditions", { required: true })}
                                  className='input input-bordered'>
                                  <option value="excellent">Excellent</option>
                                  <option value="good">Good</option>
                                  <option value="fair">Fair</option>
                              </select>
                          </div>

                          <div className="form-control">
                              <label className="label">
                                  <span className="label-text">Condition</span>
                              </label>
                              <select {...register("status", { required: true })}
                                  className='input input-bordered'>
                                  <option value="Available">Available</option>
                                  <option value="Sold">Sold</option>
                                  
                              </select>
                          </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input defaultValue={user?.email} type="email" {...register("email", {
                        required: true
                        
                    })} className="input input-bordered w-full max-w-xs" />
                    
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Location</span></label>
                    <input type="text" {...register("location", {
                        required: "location is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Uses Time</span></label>
                    <input type="text" {...register("Uses", {
                        required: "Uses Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
                </div>
                {/* description */}
                <div className="form-control">
                              <label className="label">
                                  <span className="label-text">Description</span>
                              </label>
                              <input {...register("description")} placeholder="description" className="input input-bordered" type='text' />
                          </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Resell Price</span></label>
                    <input type="number" {...register("resellPrice", {
                        required: "resell price Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Original Price</span></label>
                    <input type="number" {...register("OriginalPrice", {
                        required: "original price Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
                </div>

                {/* date */}
                <div className="form-control w-full max-w-xs">
                    <label className="label" > <span className="label-text">Date</span></label>
                    <input type="date" {...register("date", {
                        required: "Date is Required"

                    })} className="input input-bordered w-full max-w-xs" />
                    
                </div>
                
                

          <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            {...register("img",{
              required: "photo is required"
            })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

          

          <input
            type="submit"
            className="btn bg-gray-600 w-full  text-white mt-7"
            value="Add Product"
          />
        
      </form>
    </div>
    </div>
  )
}

export default AddProduct