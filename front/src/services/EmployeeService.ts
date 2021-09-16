import { IEmployeeForm, IHttpStatus } from "models/interfaces";
import axios from "axios";
import { format } from "date-fns";

const baseUri = "/employee";

export async function create(values: IEmployeeForm): Promise<IHttpStatus<boolean>> {
  try {
    await axios.post(baseUri, values);
    return { ok: true, payload: true };
  } catch (error: any) {
    return { ok: false, payload: false, message: error?.response?.data?.errors.map((item: any) => item.defaultMessage) };
  }
}

export async function update(values: IEmployeeForm): Promise<IHttpStatus<IEmployeeForm>> {
  try {

    const { data } = await axios.put("/employee", {
      birthday: values.birthday ? format(values.birthday, "yyyy-MM-dd") : null,
      address: values.address,
      phone: values.phone,
      vaccination_status: values.vaccination_status || false,
      doses_number: values.doses_number || null,
      vaccination_date: values.vaccination_date ? format(values.vaccination_date, "yyyy-MM-dd") : null,
      vaccine_type: values.vaccine_type || null,

    });
    return { ok: true, payload: castDatResponseToFormData(data) };
  } catch (error: any) {
    console.log(error);
    return { ok: false, payload: {} as IEmployeeForm, message: error?.response?.data?.errors.map((item: any) => item.defaultMessage) };
  }
}

export async function me(): Promise<IHttpStatus<IEmployeeForm>> {
  try {

    const { data } = await axios.get("/employee/me");

    return { ok: true, payload: castDatResponseToFormData(data) };
  } catch (error) {
    return { ok: false, payload: {} as IEmployeeForm };
  }
}

function castDatResponseToFormData(data: any): IEmployeeForm {
  const employeeForm: IEmployeeForm = {
    ci: data.ci,
    email: data.email,
    firstname: data.firstname,
    lastname: data.lastname,
    address: data?.address || "",
    phone: data?.phone || "",
    birthday: data?.birthday ? new Date(data.birthday) : null,
    vaccination_status: Boolean(data?.vaccine),
    doses_number: data?.vaccine ? data?.vaccine?.doses_number || 0 : 0,
    vaccination_date: data?.vaccine ? data?.vaccine?.vaccination_date ? new Date(data?.vaccine?.vaccination_date) : null : null,
    vaccine_type: data?.vaccine ? data?.vaccine?.vaccineType?.id || -1 : -1,
  };

  return employeeForm;
}
