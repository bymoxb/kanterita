import { useAuthContext } from "contexts/AuthContext";
import { useFormik } from "formik";
import { VALIDATION_MESSAGES } from "libs/validationMessages";
import { IUser } from "models/interfaces";
import { useState } from "react";
import { AuthService } from "services";
import * as yup from "yup";

interface IUserForm {
  username: string,
  password: string,
}

const initialValues: IUserForm = {
  username: "1234567890",
  password: "1234567890",
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
  const [responseMessages, setResponseMessages] = useState<undefined | string[]>(undefined);

  const onSubmit = async (values: IUserForm) => {

    setSubmitting(true);
    setResponseMessages(undefined);

    const result = await AuthService.login(values.username, values.password);

    if (result.ok) {
      checkAuth();
    } else {
      setResponseMessages(result.message);
    }

    setSubmitting(false);
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

    AuthService.checkUser()
      .then(result => {
        if (result.ok) {
          setAuth({ checkingAuth: false, isAuth: true, user: result.payload });
        } else {
          setAuth({ checkingAuth: false, isAuth: false, user: {} as IUser });
        }
      });
  };

  const logout = () => {

    localStorage.clear();

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
    responseMessages,
  };
};

export default useAuth;
