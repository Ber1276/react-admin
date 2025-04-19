import { createBrowserRouter} from "react-router";
import App from "../App";
import Welcome from "../views/welcome";
import NotFound from "../views/NotFound";
import Login from "../views/login";

const router = createBrowserRouter([
    {path:'/',element:<App/>},
    {path:'/welcome/:id',element:<Welcome/>},
    {path:'/login',element:<Login/>},
    {path:'*',element:<NotFound/>}
])
export default router