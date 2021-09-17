import { useFormik } from "formik";
import { VALIDATION_MESSAGES } from "libs/validationMessages";
import { IEmployeeForm, IVaccineType } from "models/interfaces";
import { useEffect, useState } from "react";
import { EmployeeService, VaccineTypesService } from "services";
import * as yup from "yup";

const initialValues: IEmployeeForm = {
  ci: "",
  email: "",
  firstname: "",
  lastname: "",
  //
  birthday: null,
  address: "",
  phone: "",
  vaccination_status: false,
  //
  vaccine_type: -1,
  doses_number: 0,
  vaccination_date: null,
};

const useProfile = () => {

  const [vaccineTypes, setVaccineTypes] = useState<IVaccineType[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [responseMessages, setResponseMessages] = useState<undefined | string[]>(undefined);

  const [profile, setProfile] = useState<IEmployeeForm>(initialValues);

  useEffect(() => {
    setSubmitting(true);
    Promise.all([
      EmployeeService.me()
        .then(result => {
          if (result.ok) {
            setProfile(result.payload);
          }
        }),
      VaccineTypesService.getAll()
        .then(result => setVaccineTypes(result.payload)),
    ]).finally(() => setSubmitting(false));
  }, []);

  const onSubmit = async (values: IEmployeeForm) => {
    setSubmitting(true);
    setResponseMessages(undefined);

    const result = await EmployeeService.update(values);

    if (result.ok) {
      setProfile(result.payload);
      formik.resetForm();
    } else {
      setResponseMessages(result.message);
    }

    setSubmitting(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: profile,
    onSubmit,
    validationSchema: yup.object().shape({
      birthday: yup.date().required(VALIDATION_MESSAGES.require).typeError(VALIDATION_MESSAGES.require),
      address: yup.string().required(VALIDATION_MESSAGES.require),
      phone: yup.string().required(VALIDATION_MESSAGES.require),
      //
      vaccine_type: yup.number().nullable().when("vaccination_status", { is: true, then: yup.number().oneOf(vaccineTypes.map(item => item.id), VALIDATION_MESSAGES.oneOf) }),
      vaccination_date: yup.date().nullable().when("vaccination_status", { is: true, then: yup.date().required(VALIDATION_MESSAGES.require).typeError(VALIDATION_MESSAGES.require) }),
      doses_number: yup.number().nullable().when("vaccination_status", { is: true, then: yup.number().required(VALIDATION_MESSAGES.require).integer(VALIDATION_MESSAGES.integer).positive(VALIDATION_MESSAGES.positive) })
    }),
  });

  return {
    formik,
    submitting,
    vaccineTypes,
    responseMessages,
  };
};

export default useProfile;
