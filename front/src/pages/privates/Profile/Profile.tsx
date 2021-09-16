import React from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Typography, Grid, FormControl, FormControlLabel, Switch, Alert, AlertTitle, } from "@mui/material";
import Input from "components/Input";
import useProfile from "hooks/useProfile";
import DatePicker from "components/DatePicker";
import Select from "components/Select";

const Profile: React.FC = () => {

  const {
    formik,
    submitting,
    vaccineTypes,
    responseMessages,
  } = useProfile();

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" sx={{ mb: 2, mt: 2 }}>
        Perfil
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
              margin="normal"
              id="ci"
              label="Cédula"
              name="ci"
              disabled={true}
              value={formik.values.ci}
            />
          </Grid>

          <Grid item xs={6} sm={6}>
            <Input
              margin="normal"
              id="firstname"
              label="Nombre"
              name="firstname"
              disabled={true}
              value={formik.values.firstname}
            />
          </Grid>

          <Grid item xs={6} sm={6}>
            <Input
              margin="normal"
              id="lastname"
              label="Apellido"
              name="lastname"
              disabled={true}
              value={formik.values.lastname}
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              margin="normal"
              id="email"
              label="Correo"
              name="email"
              type="email"
              disabled={true}
              value={formik.values.email}
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              required
              autoFocus
              margin="normal"
              id="address"
              label="Dirección"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              required
              margin="normal"
              id="phone"
              label="Teléfono"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <DatePicker
                label="Fecha de Nacimiento"
                value={formik.values.birthday || null}
                onChange={(d) => formik.setFieldValue("birthday", d)}
                error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                helperText={formik.touched.birthday && formik.errors.birthday}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <FormControl>
              <FormControlLabel
                labelPlacement="start"
                control={<Switch checked={formik.values.vaccination_status || false}
                  onChange={(e) => formik.setFieldValue("vaccination_status", e.target.checked)}
                />}
                label="¿Está vacunado?" />
            </FormControl>
          </Grid>

          {
            formik.values.vaccination_status && (
              <React.Fragment>

                <Grid item xs={12}>
                  <Select
                    id="vaccine_type"
                    label="Tipo de vacuna"
                    items={vaccineTypes.map(item => ({ id: item.id, label: item.name }))}
                    onChange={(id) => formik.setFieldValue("vaccine_type", id)}
                    value={formik.values.vaccine_type}
                    error={formik.touched.vaccine_type && Boolean(formik.errors.vaccine_type)}
                    helperText={formik.touched.vaccine_type && formik.errors.vaccine_type}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                    <DatePicker
                      label="Fecha de Vacunación"
                      value={formik.values.vaccination_date || null}
                      onChange={(d) => formik.setFieldValue("vaccination_date", d)}
                      error={formik.touched.vaccination_date && Boolean(formik.errors.vaccination_date)}
                      helperText={formik.touched.vaccination_date && formik.errors.vaccination_date}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <Input
                    required
                    margin="normal"
                    id="doses_number"
                    label="Número dosis"
                    name="doses_number"
                    type="number"
                    value={formik.values.doses_number}
                    onChange={formik.handleChange}
                    error={formik.touched.doses_number && Boolean(formik.errors.doses_number)}
                    helperText={formik.touched.doses_number && formik.errors.doses_number}
                  />
                </Grid>

              </React.Fragment>
            )
          }

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
                loading={submitting}
                disabled={submitting}
              >
                Actualizar
              </LoadingButton>
            </Box>
          </Grid>

          {
            responseMessages && (
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Alert severity="warning">
                  <AlertTitle>Advertencia</AlertTitle>
                  {responseMessages.map((item, i) => (
                    <div key={i} className="error-message">{item}</div>
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

export default Profile;
