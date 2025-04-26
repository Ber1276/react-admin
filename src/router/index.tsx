import { createBrowserRouter } from "react-router";
import Welcome from "../views/welcome";
import Login from "../views/login";
import LayoutCon from "../layout/index";
import { Navigate } from "react-router";
import Error404 from "../views/404";
import Error403 from "../views/403";
import authLoader from "./authloader";
import {lazy} from "react";
import { lazyLoad } from "./lazy";
export const router = [
    {
        element: <LayoutCon />,
        id: 'layout', 
        loader: authLoader,
        children: [
            {
                path: '/welcome',
                element: <Welcome />,
            },
            {
                path: '/dashboard',
                element: lazyLoad(lazy(() => import("../views/dashboard"))),
            },
            {
                path: '/userList',
                element: lazyLoad(lazy(() => import("../views/user"))),
            },
            {
                path: '/roleList',
                element: lazyLoad(lazy(() => import("../views/role"))),
            },
            {
                path: '/menuList',
                element: lazyLoad(lazy(() => import("../views/menu"))),
            },
            {
                path: '/deptList',
                element: lazyLoad(lazy(() => import("../views/dept"))),
                meta: {
                    requireAuth: true, // 表示需要登录才能访问
                }
            },
        ],
    },
    { path: '/', element: <Navigate to={'/welcome'}></Navigate> },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <Navigate to="/404" />,
    },
    {
        path: '/404',
        element: <Error404 />,
    },
    {
        path: '/403',
        element: <Error403 />,
    },
]
export default createBrowserRouter(router)