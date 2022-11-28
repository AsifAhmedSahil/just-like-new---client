import AddProduct from "../../Dashboard/AddProduct/AddProduct";
import AllSellers from "../../Dashboard/AllUsers/AllSellers";
import AllUsers from "../../Dashboard/AllUsers/AllUsers";

import MyOrder from "../../Dashboard/MyOrder/MyOrder";
import MyProduct from "../../Dashboard/MyProduct/MyProduct";
import Payment from "../../Dashboard/Payment/Payment";
import Reported from "../../Dashboard/Reported/Reported";
import Welcome from "../../Dashboard/Welcome/Welcome";
import DashboardLayout from "../../Layout/DashboardLayout";
import Blogs from "../../Pages/Blogs/Blogs";
import Categories from "../../Pages/Home/Categories/Categories";
import Login from "../../Pages/login/Login";
import SignUp from "../../Pages/login/SignUp";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import AdminRoute from "./AdminRoute/AdminRoute";
import BuyerRoute from "./BuyerRoute/BuyerRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoutes";
import SellerRoute from "./SellerRoute/SellerRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");
const { default: Home } = require("../../Pages/Home/Home/Home");


export const router = createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        errorElement:<DisplayError/>,
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
                loader:({params}) => fetch(`https://assignment-12-final-server.vercel.app/category/${params.name}`)
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
                element:<BuyerRoute><MyOrder/></BuyerRoute>
            },
            {
                path:"/dashboard/allbuyers",
                element:<AdminRoute><AllUsers/></AdminRoute>
            },
            {
                path:"/dashboard/allsellers",
                element:<AdminRoute><AllSellers/></AdminRoute>
            },
            {
                path:"/dashboard/reported",
                element:<AdminRoute><Reported/></AdminRoute>
            },
            {
                path:"/dashboard/addproduct",
                element:<SellerRoute><AddProduct/></SellerRoute>
            },{
                path:"/dashboard/myproduct",
                element:<SellerRoute><MyProduct/></SellerRoute>
            },
            {
                path:"/dashboard/payment/:id",
                element:<Payment/>,
                loader:({params}) => fetch(`https://assignment-12-final-server.vercel.app/bookings/${params.id}`)
                // loader: ({params}) => fetch(`https://assignment-12-final-server.vercel.app/bookings/{params.id}`)
            }
            
        ]
    }
])