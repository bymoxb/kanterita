import axios from "axios";
import qs from "qs";
import { IHttpStatus, IUser } from "models/interfaces";
import { AutoFixHighSharp } from "@mui/icons-material";

export async function login(username: string, password: string): Promise<IHttpStatus<boolean>> {
  try {
    const { data } = await axios({
      method: "POST",
      url: "/login",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({ username, password })
    });

    localStorage.setItem("jwt", data.access_token);

    return { ok: true, payload: true };
  } catch (error) {
    return { ok: false, payload: false, message: ["Credenciales incorrectas"] };
  }
}

export async function checkUser(): Promise<IHttpStatus<IUser>> {
  try {
    axios.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    };

    const { data } = await axios.get("/employee/me");

    const tempUser: IUser = {
      username: data.ci,
      id: data.user.id,
      rol: data.user.rol
    };

    return { ok: true, payload: tempUser };
  } catch (error) {
    return { ok: false, payload: {} as IUser };
  }
}
