import http from "./http";
import { apiUrl } from "../config.json";

export const getAllProducts = () => http.get(apiUrl + '/prods/all').then(resp => resp.data);