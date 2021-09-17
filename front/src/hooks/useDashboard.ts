import { useEffect, useState } from "react";
import { IEmployee, IEmployeeForm, IVaccineType } from "models/interfaces";
import { EmployeeService, VaccineTypesService } from "services";
import { useFormik } from "formik";
import { subDays } from "date-fns";

interface IFilter {
  vaccination_status: boolean,
  vaccine_type: number,
  from: Date,
  to: Date,
}

const initialValues: IFilter = {
  vaccination_status: false,
  vaccine_type: -1,
  from: subDays(new Date(), 7),
  to: new Date(),
};

const useDashboard = () => {

  const [submitting, setSubmitting] = useState(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [vaccineTypes, setVaccineTypes] = useState<IVaccineType[]>([]);

  useEffect(() => {
    setSubmitting(true);
    Promise
      .all([
        EmployeeService.getAll()
          .then(r => setEmployees(r.payload)),
        VaccineTypesService.getAll()
          .then(result => setVaccineTypes(result.payload)),
      ])
      .finally(() => setSubmitting(false));
  }, []);

  const onSubmit = (values: IFilter) => {
    //
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return {
    employees,
    formik,
    submitting,
    vaccineTypes,
  };
};

export default useDashboard;
