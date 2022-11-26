import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
  const { register, formState:{errors}, handleSubmit } = useForm();
  const {SignIn} = useContext(AuthContext)
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [ token] = useToken(loginUserEmail)
  const location = useLocation()
  const navigate = useNavigate()

  const from = location.state?.from?.pathname || "/"

  if(token){
    navigate(from,{replace:true});
  }

  const handleLogin = data =>{
    console.log(data)
    setLoginError('')
    SignIn(data.email,data.password)
    .then(result => {
      const user = result.user;
      console.log(user);
      // toast.success("login")
      setLoginUserEmail(data.email)
      
  })
  .catch(error => {
    console.log(error)
    setLoginError(error.message);
  });

  }
  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-4xl text-center text-cyan-500">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              {...register("email" ,{
                required: "Email Address is required"
              }) }
              className="input input-bordered w-full max-w-xs"
              
            />
            {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password" ,{
                required: "Password is required"
              })}
              className="input input-bordered w-full max-w-xs"
            />
             {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
            <label className="label">
              <span className="label-text">Forget Password?</span>
            </label>
            {/* <div>{loginError && <p className="text-red-600">{loginError} dekhao</p>}</div> */}
            <input
              type="submit"
              className="btn bg-gray-600 w-full text-white"
              value="Login"
            />
          </div>
          <div>
            {
              loginError && <p>{loginError}</p>
            }
          </div>
        </form>
        <div className="text-center mt-4">
          <p>
            New to here?{" "}
            <Link to="/signup" className="text-cyan-500">
              Create New Account?
            </Link>
          </p>
        </div>

        <div className="divider">OR</div>
        <button className="btn btn-outline w-full rounded">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  )
}

export default Login