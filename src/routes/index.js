import React from "react";
import { NotFound } from "~/components/Layout/Error";
import { SignLayout } from "~/components/Layout";
import Management from "~/Page/Management";
const Login = React.lazy(() => import("~/Page/Login"));
const Register = React.lazy(() => import("~/Page/Register"));
const Home = React.lazy(() => import("~/Page/Home"));
const CreateProject = React.lazy(() => import("~/Page/CreateProject"));
const ProjectDetail = React.lazy(() => import("~/Page/ProjectDetail"));
const UserManagement = React.lazy(() => import("~/Page/UserManagement"));
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
