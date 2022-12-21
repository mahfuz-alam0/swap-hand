import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import Main from "../../Layout/Main/Main";
import Blog from "../../Pages/Blog/Blog";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllReports from "../../Pages/Dashboard/AdminRoute/Allreports/AllReports";
import AllSeller from "../../Pages/Dashboard/AdminRoute/Allseller/AllSeller";
import AllBuyers from "../../Pages/Dashboard/AdminRoute/Allusers/AllBuyers";
import AllProduct from "../../Pages/Dashboard/AllProduct/AllProduct";
import MyBuyers from "../../Pages/Dashboard/MyBuyers/MyBuyers";
import PushAdvertise from "../../Pages/Dashboard/PushAdvertise/PushAdvertise";
import Error404 from "../../Pages/Error404/Error404";
import Home from "../../Pages/Home/Home";
import Payment from "../../Pages/Home/Payment/Payment";
import ProductByCategory from "../../Pages/Home/ProductByCategory/ProductByCategory";
import Login from "../../Pages/Login/Login";
import MyOrders from "../../Pages/MyOrders/MyOrders";
import Report from "../../Pages/Report/Report";
import SignUp from "../../Pages/SignUp/SignUp";
import Admin from "../Admin/Admin";
import Private from "../Private/Private";
import Seller from "../Seller/Seller";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/blog",
                element: <Blog />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/report",
                element: <Private><Report /></Private>,
            },
            {
                path: "/category/:category",
                element: <ProductByCategory />,
                loader: ({ params }) => fetch(`https://swap-hand-server-hasibul240.vercel.app/category/${params.category}`)
            },
            {
                path: "/push-advertise/:id",
                loader: ({ params }) => fetch(`https://swap-hand-server-hasibul240.vercel.app/products/${params.id}`),
                element: <Seller><PushAdvertise /></Seller>,
            },
            {
                path: "/payment/:id",
                loader: ({ params }) => fetch(`https://swap-hand-server-hasibul240.vercel.app/my-orders?id=${params.id}`),
                element: <Private><Payment /></Private>,
            },
            {
                path: "/my-orders",
                element: <Private><MyOrders /></Private>,
            },
            {
                path: "/dashboard",
                element: <Private><DashboardLayout /></Private>,
                children: [
                    {
                        path: "/dashboard",
                        element: <Seller><AllProduct /></Seller>,
                    },
                    {
                        path: "/dashboard/all-products",
                        element: <Seller><AllProduct /></Seller>,
                    },
                    {
                        path: "/dashboard/addproduct",
                        element: <Seller><AddProduct /></Seller>,
                    },
                    {
                        path: "/dashboard/my-buyers",
                        element: <Seller><MyBuyers /></Seller>,
                    },
                ]
            },
            {
                path: "/dashboard-admin",
                element: <Private><DashboardLayout /></Private>,
                children: [
                    {
                        path: "/dashboard-admin",
                        element: <Admin><AllBuyers /></Admin>,
                    },
                    {
                        path: "/dashboard-admin/allusers",
                        element: <Admin><AllBuyers /></Admin>,
                    },
                    {
                        path: "/dashboard-admin/allseller",
                        element: <Admin><AllSeller /></Admin>,
                    },
                    {
                        path: "/dashboard-admin/allreport",
                        element: <Admin><AllReports /></Admin>,
                    },
                ]
            },
            {
                path: "*",
                element: <Error404 />
            }
        ]
    }
])

export default router;