import React from "react";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";

import Dashboard from "pages/privates/Dashboard/Dashboard";
import Employee from "pages/privates/Employee/Employee";
import Profile from "pages/privates/Profile/Profile";
import { Rol } from "models/enums";

interface IScreen {
  path: string,
  label: string,
  component: React.FC,
  icon: any,
  isAdminRoute?: boolean,
}

export const DEFAULT_ROUTE = "profile";

const ROUTES: IScreen[] = [
  // USER
  {
    path: DEFAULT_ROUTE,
    label: "Perfil",
    component: Profile,
    icon: <AccountBoxIcon />,
  },
  // ADMIN
  {
    path: "dashboard",
    label: "Dashboard",
    component: Dashboard,
    icon: <DashboardIcon />,
    isAdminRoute: true,
  },
  {
    path: "employee",
    label: "Empleados",
    component: Employee,
    icon: <GroupIcon />,
    isAdminRoute: true,
  },
];

export const getRoutes = (p: Rol): IScreen[] => ROUTES.filter(item => !item.isAdminRoute || p === Rol.ADMIN);

export const getAdminLinks = (p: Rol): IScreen[] => ROUTES.filter(item => item.isAdminRoute && p === Rol.ADMIN);
export const getUserLinks = (): IScreen[] => ROUTES.filter(item => !item.isAdminRoute);
