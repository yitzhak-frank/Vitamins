import http from "./http";
import { apiUrl } from "../config.json";

export const getAllProducts = () => http.get(apiUrl + '/prods/all').then(resp => resp.data);

export const getProductById = (id) => http.get(`${apiUrl}/prods/single/${id}`).then(resp => resp.data);