import AddProduct from "../../Dashboard/AddProduct/AddProduct";
import AllUsers from "../../Dashboard/AllUsers/AllUsers";

import MyOrder from "../../Dashboard/MyOrder/MyOrder";
import MyProduct from "../../Dashboard/MyProduct/MyProduct";
import Payment from "../../Dashboard/Payment/Payment";
import Welcome from "../../Dashboard/Welcome/Welcome";
import DashboardLayout from "../../Layout/DashboardLayout";
import Blogs from "../../Pages/Blogs/Blogs";
import Categories from "../../Pages/Home/Categories/Categories";
import Login from "../../Pages/login/Login";
import SignUp from "../../Pages/login/SignUp";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import AdminRoute from "./AdminRoute/AdminRoute";
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
        errorElement:<DisplayError/>,
        children:[
            {
                path:"/dashboard",
                element:<Welcome/>
            },{
                path:"/dashboard/myorder",
                element:<MyOrder/>
            },
            {
                path:"/dashboard/allusers",
                element:<AdminRoute><AllUsers/></AdminRoute>
            },
            {
                path:"/dashboard/addproduct",
                element:<AddProduct/>
            },{
                path:"/dashboard/myproduct",
                element:<MyProduct/>
            },
            {
                path:"/dashboard/payment/:id",
                element:<Payment/>,
                loader:({params}) => fetch(`http://localhost:5000/bookings/${params.id}`)
                // loader: ({params}) => fetch(`http://localhost:5000/bookings/{params.id}`)
            }
            
        ]
    }
])