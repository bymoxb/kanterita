import React from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { List } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

import Link from "./Link";
import { getUserLinks, getAdminLinks } from "layout/RoutesList";
import { useAuthContext } from "contexts/AuthContext";

const drawerWidth = 240;

const DrawerStyle = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open, }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

interface DrawerProps {
  open: boolean,
  toggleDrawer: () => void,
}

const Drawer: React.FC<DrawerProps> = ({ open, toggleDrawer }) => {

  const { auth: { user } } = useAuthContext();

  return (
    <DrawerStyle variant="permanent" open={open} >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {
          getUserLinks()
            .map(item => (
              <Link
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
              />
            ))
        }
      </List>

      <Divider />
      {/* <ListSubheader inset>Administración</ListSubheader> */}
      {
        getAdminLinks(user.rol)
          .map(item => (
            <Link
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
            />
          ))
      }
    </DrawerStyle>
  );
};

export default Drawer;
