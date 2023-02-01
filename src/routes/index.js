import Films from "~/page/Admin/Films";
import Users from "~/page/Admin/Users";
import Signin from "~/page/Admin/Signin";
import NotFound from "~/page/404Page";
import Register from "~/page/Admin/register";
const publicRoutes = [
  { path: "/", component: Films },
  { path: "/admin/user", component: Users },
  { path: "/signin", component: Signin, layout: null },
  { path: "/register", component: NotFound, layout: null },
  { path: "*", component: Register, layout: null },
];
export { publicRoutes };
