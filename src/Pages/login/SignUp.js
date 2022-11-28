import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form"; 
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";
// import { toast } from 'react-toastify'
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const [createdUserEmail,setCreatedUserEmail] = useState("")
  const [token] = useToken(createdUserEmail)
    const {createUser,updateUser,providerLogin} = useContext(AuthContext)
    const [signupError,setSignupError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  
  const handleSignUp = (data) => {
    console.log(data);
    setSignupError("")
    createUser(data.email,data.password,data.user_type)
    .then(result => {
        const user = result.user;
        
        console.log(user);
        const userInfo = {
            displayName: data.name
        }
        updateUser(userInfo)
        .then(()=>{
          toast.success("User Created Succesfully! 🙋 ")
          navigate("/")
          
          saveUser(data.name,data.email,data.role)
          
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
        console.log(err)
        setSignupError(err.message)
    });
  };



  const saveUser = (name,email,role) =>{
    const user = {name,email,role};
    fetch("https://assignment-12-final-server.vercel.app/users",{
      method: 'POST',
      headers:{
        "content-type": "application/json"
      },
      body:JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log("saveuser",data);
      setCreatedUserEmail(email)
      
    })
  }

  const googleProvider = new GoogleAuthProvider()

  const handleGoogle = () =>{
    providerLogin(googleProvider)
    .then(result => {
      const user = result.user;
      console.log(user)
    })
    .catch(err => console.log(err))
  }


  if(token){
    navigate("/")
  }
  
  return (
    // <div className="h-[800px] flex justify-center items-center">
    //   <div className="w-96 p-7">
    //     <h2 className="text-4xl text-center text-cyan-500">Sign Up</h2>
    //     <form onClick={handleSubmit(handleSignUp)}>
    //       <div className="form-control w-full max-w-xs">
    //         <label className="label">
    //           <span className="label-text">Name</span>
    //         </label>
    //         <input
    //           type="text"
    //           {...register("name", {
    //             required: "name is required",
    //           })}
    //           className="input input-bordered w-full max-w-xs"
    //         />
    //       </div>
    //       <div className="form-control w-full max-w-xs">
    //         <label className="label">
    //           <span className="label-text">Email</span>
    //         </label>
    //         <input
    //           type="email"
    //           {...register("email", {
    //             required: "Email Address is required",
    //           })}
    //           className="input input-bordered w-full max-w-xs"
    //         />
    //         {errors.email && (
    //           <p className="text-red-500">{errors.email?.message}</p>
    //         )}
    //       </div>
    //       <div className="form-control w-full max-w-xs">
    //         <label className="label">
    //           <span className="label-text">Password</span>
    //         </label>
    //         <input
    //           type="password"
    //           {...register("password", {
    //             required: "Password is required",
    //           })}
    //           required
    //           className="input input-bordered w-full max-w-xs"
    //         />
    //         {errors.password && (
    //           <p className="text-red-500">{errors.password?.message}</p>
    //         )}
    //         {
    //           signupError && <p className="text-red-500"> {signupError}</p>
    //         }
    //       </div>
    //       <div className="form-control w-full max-w-xs mt-6">
    //         <label className="label">
    //         <select className="select select-bordered w-full max-w-xs" 
    //         {...register("user_type", {
    //             required: true,
    //           })}
    //         >
             
    //         <option value="buyer">Buyer</option>
    //         <option value="seller">Seller</option>
    //         </select>

    //         </label>

          

          
    //       </div>

          
          
    //       <div>
    //         <input
    //           type="submit"
    //           className="btn bg-gray-600 w-full text-white mt-7"
    //           value="Sign Up"
    //         ></input>
    //       </div>
    //     </form>
    //     <div className="text-center mt-4">
    //       <p>
    //         Already Have an Account?
    //         <Link to="/login" className="text-cyan-500">
    //           Please Login
    //         </Link>
    //       </p>
    //     </div>
      //   <div className="divider">OR</div>
      //   <button className="btn btn-outline w-full rounded">
      //     CONTINUE WITH GOOGLE
      //   </button>
      // </div>
    // </div>

    
      <div className="hero my-32">
          <div className="hero-content flex-col w-1/2">
              <div className="text-center lg:text-left">
                  <h1 className="text-5xl text-center font-bold">Sign Up</h1>
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <div className="card-body">
                      <form onSubmit={handleSubmit(handleSignUp)}>
                          <div className="form-control">
                              <label className="label">
                                  <span className="label-text">Full Name</span>
                              </label>
                              <input {...register("name")} placeholder="name" className="input input-bordered" type='text' />
                          </div>
                          <div className="form-control">
                              <label className="label">
                                  <span className="label-text">I am a </span>
                              </label>
                              <select {...register("role", { required: true })}
                                  className='input input-bordered'>
                                  <option value="Buyer">Buyer</option>
                                  <option value="Seller">Seller</option>
                              </select>
                          </div>

                          <div className="form-control">
                              <label className="label">
                                  <span className="label-text">Email</span>
                              </label>
                              <input {...register("email")} placeholder="email" className="input input-bordered" type='text' />
                          </div>
                          <div className="form-control">
                              <label className="label">
                                  <span className="label-text">Password</span>
                              </label>
                              <input {...register("password")} placeholder="password" className="input input-bordered" type='password' />
                              <label className="label text-left">
                                  <p>
                                      Already have an account?
                                      <Link to='/login' className="link link-hover ml-1 text-primary underline">Login </Link>
                                  </p>

                              </label>
                          </div>
                          <div className="form-control mt-2">
                              <input className="btn btn-primary" type="submit" value='Sign Up' />
                          </div>
                      </form>
                      <button onClick={handleGoogle} className="btn btn-outline w-full rounded">
                            CONTINUE WITH GOOGLE
                      </button>
                  </div>
                  
              </div>
          </div>
      </div>
  );
  
};

export default SignUp;
