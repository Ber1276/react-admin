import { createBrowserRouter } from "react-router";
import Welcome from "../views/welcome";
import NotFound from "../views/NotFound";
import Login from "../views/login";
import LayoutCon from "../layout/index";
import { Navigate } from "react-router";

const router = createBrowserRouter([
    {
        element: <LayoutCon />,
        children: [
            {
                path: '/welcome',
                element: <Welcome />,
            },
            // {
            //     path: '/dashboard',
            //     element: <DashBoard />,
            // },
            // {
            //     path: '/userList',
            //     element: <UserList />,
            // },
            // {
            //     path: '/roleList',
            //     element: <RoleList />,
            // },
            // {
            //     path: '/menuList',
            //     element: <MenuList />,
            // },
            // {
            //     path: '/deptList',
            //     element: <DeptList />,
            // },
        ],
    },
    { path: '/', element: <Navigate to={'/welcome'}></Navigate> },
    { path: '/login', element: <Login /> },
    { path: '*', element: <NotFound /> }
])
export default router