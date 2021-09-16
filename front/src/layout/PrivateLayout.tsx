import React, { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";

import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import { getRoutes, DEFAULT_ROUTE } from "./RoutesList";

import { useAuthContext } from "contexts/AuthContext";

const PrivateLayout: React.FC = () => {

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { auth: { user } } = useAuthContext();
  const { path } = useRouteMatch();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar open={open} toggleDrawer={toggleDrawer} />
      <Drawer open={open} toggleDrawer={toggleDrawer} />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>

                <Switch>
                  {
                    getRoutes(user.rol)
                      .map(item => (
                        <Route
                          exact
                          key={item.path}
                          path={`${path}/${item.path}`}
                          component={item.component} />
                      ))
                  }
                  <Redirect to={`${path}/${DEFAULT_ROUTE}`} from={path} />
                  <Redirect from="*" to={path} />
                </Switch>

              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default PrivateLayout;
