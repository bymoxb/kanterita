import { useAuthContext } from "contexts/AuthContext";
import { useFormik } from "formik";
import { VALIDATION_MESSAGES } from "libs/validationMessages";
import { Rol } from "models/enums";
import { IUser } from "models/interfaces";
import { useState } from "react";
import * as yup from "yup";

interface IUserForm {
  username: string,
  password: string,
}

const initialValues: IUserForm = {
  username: "luis",
  password: "password",
};

const validationSchema = yup.object().shape({
  username: yup.string().required(VALIDATION_MESSAGES.require),
  password: yup.string().required(VALIDATION_MESSAGES.require),
});

const useAuth = () => {

  const {
    auth,
    setAuth,
  } = useAuthContext();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (values: IUserForm) => {
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);

      setAuth({
        checkingAuth: false,
        isAuth: true,
        user: {
          id: 1,
          rol: Rol.ADMIN,
          username: "luis"
        }
      });

    }, 2000);
  };

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema
  });

  const checkAuth = () => {

    setAuth({
      ...auth,
      checkingAuth: true,
    });

    setTimeout(() => {
      setAuth({
        checkingAuth: false,
        isAuth: true,
        user: {
          id: 1,
          rol: Rol.ADMIN,
          username: "luis"
        }
      });
    }, 2000);
  };

  const logout = () => {
    setAuth({
      checkingAuth: false,
      isAuth: false,
      user: {} as IUser,
    });
  };

  return {
    formik,
    submitting,
    checkAuth,
    logout,
  };
};

export default useAuth;
