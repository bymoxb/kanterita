import React from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  Box,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import {
  LoadingButton
} from "@mui/lab";


import Input from "components/Input";
import useAuth from "hooks/useAuth";
import { useTheme } from "@mui/material/styles";

const Login: React.FC = () => {

  const {
    formik,
    submitting,
  } = useAuth();

  const theme = useTheme();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LockOutlinedIcon sx={{ m: 2, fontSize: 64 }} />

        <Typography component="h1" variant="h5">
          Inicar sesión
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}>

          <Input
            required
            margin="normal"
            id="username"
            label="Usuario"
            name="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <Input
            required
            margin="normal"
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={submitting}
            disabled={submitting}
          >
            Ingresar
          </LoadingButton>

        </Box>
      </Box>
    </Container>
  );
};

export default Login;
