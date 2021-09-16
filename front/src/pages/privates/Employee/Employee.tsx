import { LoadingButton } from "@mui/lab";
import { Box, Divider, Typography, Grid, Alert, AlertTitle } from "@mui/material";
import Input from "components/Input";
import useEmployee from "hooks/useEmployee";
import React from "react";

const Employee: React.FC = () => {

  const {
    submitting,
    formik,
    responseMessages,
  } = useEmployee();

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" sx={{ mb: 2, mt: 2 }}>
        Registro de empleados
      </Typography>
      <Divider />

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}>
        <Grid container spacing={1}>

          <Grid item xs={12}>
            <Input
              required
              margin="normal"
              id="ci"
              label="Cédula"
              name="ci"
              autoFocus
              value={formik.values.ci}
              onChange={formik.handleChange}
              error={formik.touched.ci && Boolean(formik.errors.ci)}
              helperText={formik.touched.ci && formik.errors.ci}
            />
          </Grid>

          <Grid item xs={6} sm={6}>
            <Input
              required
              margin="normal"
              id="firstname"
              label="Nombre"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
            />
          </Grid>

          <Grid item xs={6} sm={6}>
            <Input
              required
              margin="normal"
              id="lastname"
              label="Apellido"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              required
              margin="normal"
              id="email"
              label="Correo"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <LoadingButton
                type="reset"
                onClick={formik.handleReset}
                variant="contained"
                disabled={submitting}
                color="error"
              >
                Limpiar
              </LoadingButton>

              <LoadingButton
                type="submit"
                variant="contained"
                // sx={{ color: "#fff" }}
                loading={submitting}
                disabled={submitting}
              >
                Guardar
              </LoadingButton>
            </Box>
          </Grid>

          {
            responseMessages && (
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Alert severity="warning">
                  <AlertTitle>Advertencia</AlertTitle>
                  {responseMessages.map((item, i) => (
                    <div key={i}>{item}</div>
                  ))}
                </Alert>
              </Grid>
            )
          }

        </Grid>
      </Box>

    </React.Fragment >
  );
};

export default Employee;
