import Dashboard from "../../Dashboard/Dashboard/Dashboard";
import Blogs from "../../Pages/Blogs/Blogs";
import Categories from "../../Pages/Home/Categories/Categories";
import Login from "../../Pages/login/Login";
import SignUp from "../../Pages/login/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoutes";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");
const { default: Home } = require("../../Pages/Home/Home/Home");


export const router = createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/signup",
                element:<SignUp/>
            },
            {
                path:"/blogs",
                element:<Blogs/>
            },
            {
                path:"/category/:id",
                element:<Categories/>,
                // loader:({params}) => fetch(`https://blockchain-courses-server-asifahmedsahil12-gmailcom.vercel.app/courses/${params.id}`)
            },

        ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoute><Dashboard/></PrivateRoute>
    }
])