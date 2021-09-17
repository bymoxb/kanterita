import { Divider, Typography, Grid, FormControl, Box, FormControlLabel, Switch } from "@mui/material";
import useDashboard from "hooks/useDashboard";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { LoadingButton } from "@mui/lab";
import Select from "components/Select";
import DatePicker from "components/DatePicker";

const Dashboard = () => {

  const {
    formik,
    employees,
    submitting,
    vaccineTypes,
  } = useDashboard();

  return (
    <Box>
      <Typography component="h1" variant="h5" sx={{ mb: 2, mt: 2 }}>
        Dashboard
      </Typography>

      <Divider />

      <Box
        noValidate
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ mb: 2 }}
      >

        <Grid container sx={{ alignItems: "center" }}>

          <Grid item sm={12} md={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <FormControl>
              <FormControlLabel
                labelPlacement="start"
                control={<Switch checked={formik.values.vaccination_status || false}
                  onChange={(e) => formik.setFieldValue("vaccination_status", e.target.checked)}
                />}
                label="Vacunados" />
            </FormControl>
          </Grid>

          <Grid item sm={12} md={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <FormControl sx={{ minWidth: 200 }}>
              <Select
                id="vaccine_type"
                label="Tipo de vacuna"
                items={vaccineTypes.map(item => ({ id: item.id, label: item.name }))}
                onChange={(id) => formik.setFieldValue("vaccine_type", id)}
                value={formik.values.vaccine_type}
              />
            </FormControl>
          </Grid>

          <Grid container item spacing={2} sm={12} md={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1, mb: 1 }}>
            <Grid item>
              <FormControl>
                <DatePicker
                  label="Desde"
                  value={formik.values.from || null}
                  onChange={(d) => formik.setFieldValue("from", d)}
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl>
                <DatePicker
                  label="Hasta"
                  value={formik.values.to || null}
                  onChange={(d) => formik.setFieldValue("from", d)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item sm={12} md={3} sx={{ justifyContent: "space-evenly", mt: 1 }}>
            <LoadingButton
              variant="outlined"
              color="warning"
            >
              Limpiar
            </LoadingButton>

            <LoadingButton
              variant="outlined"
              sx={{ ml: 2 }}
            >
              Filtrar
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cédula</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Tipo de vacuna</TableCell>
            <TableCell>Dosis</TableCell>
            <TableCell>Fecha de vacuna</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.ci}</TableCell>
              <TableCell>{row.firstname}</TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row?.vaccine?.vaccineType.name || ""}</TableCell>
              <TableCell>{row?.vaccine?.doses_number || ""}</TableCell>
              <TableCell>{row?.vaccine?.vaccination_date ? format(new Date(row.vaccine.vaccination_date), "yyyy-MM-dd") : ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Box >
  );
};

export default Dashboard;
