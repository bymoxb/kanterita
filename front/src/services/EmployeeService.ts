import { IEmployeeForm, IHttpStatus } from "models/interfaces";
import axios from "axios";

const baseUri = "/employee";

export async function create(values: IEmployeeForm): Promise<IHttpStatus<boolean>> {
  try {
    await axios.post(baseUri, values);
    return { ok: true, payload: true };
  } catch (error: any) {
    return { ok: false, payload: false, message: error?.response?.data?.errors.map((item: any) => item.defaultMessage) };
  }
}
