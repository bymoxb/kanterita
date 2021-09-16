import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export function initaxios(): void {
  axios.defaults.baseURL = BASE_URL;
}
