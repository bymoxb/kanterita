import { useFormik } from "formik";
import { VALIDATION_MESSAGES } from "libs/validationMessages";
import { IEmployeeForm } from "models/interfaces";
import { useState } from "react";
import { verificarCedula } from "udv-ec";
import * as yup from "yup";

const initialValues: IEmployeeForm = {
  ci: "1500449861",
  lastname: "Luis",
  firstname: "Fernando",
  email: "moxb@outlook.es",
};

const regexName = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi;

const validationSchema = yup.object().shape({
  ci: yup.string().max(10, VALIDATION_MESSAGES["max"](10)).required(VALIDATION_MESSAGES.require).test("ci", VALIDATION_MESSAGES.ci, (v) => verificarCedula(v || "")),
  email: yup.string().email(VALIDATION_MESSAGES.email).required(VALIDATION_MESSAGES.require),
  firstname: yup.string().required(VALIDATION_MESSAGES.require).matches(regexName, VALIDATION_MESSAGES.firstname),
  lastname: yup.string().required(VALIDATION_MESSAGES.require).matches(regexName, VALIDATION_MESSAGES.lastname),
});

const useEmployee = () => {

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (values: IEmployeeForm) => {
    alert(JSON.stringify(values, null, 2));
  };

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema,
  });

  return {
    formik,
    submitting,
  };
};

export default useEmployee;
