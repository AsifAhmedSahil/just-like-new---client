import AllUsers from "../../Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Dashboard/Dashboard/Dashboard";
import MyOrder from "../../Dashboard/MyOrder/MyOrder";
import DashboardLayout from "../../Layout/DashboardLayout";
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
                path:"/category/:name",
                element:<PrivateRoute><Categories/></PrivateRoute>,
                loader:({params}) => fetch(`http://localhost:5000/category/${params.name}`)
            },

        ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
        children:[
            {
                path:"/dashboard",
                element:<MyOrder/>
            },
            {
                path:"/dashboard/allusers",
                element:<AllUsers/>
            }
        ]
    }
])