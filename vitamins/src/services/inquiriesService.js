import http from "./http";
import { apiUrl } from '../config.json';

export const addInquiry = (inquiry) => http.post(apiUrl + '/inquiries/add', inquiry);

export const updateStatus = (status, inquiry_id) => http.patch(`${apiUrl}/inquiries/update?id=${inquiry_id}`, status);

export const getNewInquiriesCount = () => http.get(apiUrl + '/inquiries/isOpenedCount')
    .then(resp => typeof resp.data === 'number'? resp.data : 0);
