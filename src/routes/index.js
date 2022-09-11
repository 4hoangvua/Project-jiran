import React from "react";
import { NotFound } from "~/components/Layout/Error";
import { SignLayout } from "~/components/Layout";
import Management from "~/Page/Management";
import Login from "~/Page/Login";
import Register from "~/Page/Register";
import CreateProject from "~/Page/CreateProject";
import ProjectDetail from "~/Page/ProjectDetail";
import UserManagement from "~/Page/UserManagement";
const Home = React.lazy(() => import("~/Page/Home"));

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login, layout: SignLayout },
  { path: "/register", component: Register, layout: SignLayout },
  { path: "/management", component: Management },
  { path: "/createProject", component: CreateProject },
  { path: "/projectDetail/:projectId", component: ProjectDetail },
  { path: "/userManagement", component: UserManagement },
  { path: "*", component: NotFound, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
