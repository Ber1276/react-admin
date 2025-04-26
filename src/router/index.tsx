import { createBrowserRouter } from "react-router";
import Welcome from "../views/welcome";
import Login from "../views/login";
import LayoutCon from "../layout/index";
import { Navigate } from "react-router";
import DashBoard from "../views/dashboard";
import UserList from "../views/user";
import RoleList from "../views/role";
import MenuList from "../views/menu";
import DeptList from "../views/dept";
import Error404 from "../views/404";
import Error403 from "../views/403";

const router = createBrowserRouter([
    {
        element: <LayoutCon />,
        children: [
            {
                path: '/welcome',
                element: <Welcome />,
            },
            {
                path: '/dashboard',
                element: <DashBoard />,
            },
            {
                path: '/userList',
                element: <UserList />,
            },
            {
                path: '/roleList',
                element: <RoleList />,
            },
            {
                path: '/menuList',
                element: <MenuList />,
            },
            {
                path: '/deptList',
                element: <DeptList />,
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
])
export default router