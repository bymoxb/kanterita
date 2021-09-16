import axios from "axios";
import { IHttpStatus, IVaccineType } from "models/interfaces";

const baseUrl = "vaccine-types";

export async function getAll(): Promise<IHttpStatus<IVaccineType[]>> {
  try {
    const { data } = await axios.get(baseUrl);
    return { ok: true, payload: data };
  } catch (error) {
    return { ok: false, payload: [] };
  }
}
