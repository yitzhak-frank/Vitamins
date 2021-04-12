import http from "./http";
import { apiUrl } from "../config.json";

export const getTableData = (table, sortBy, orderBy, skip, limit) => {
    return http.get(`${apiUrl}/${table}?sort=${sortBy}&order=${orderBy}&skip=${skip}&limit=${limit}`)
    .then(resp => resp.data)
}

export const searchItems = (table, sortBy, orderBy, skip, limit, searchValue, searchFields) => {
    return http.get(
        `${apiUrl}/${table}/search?sort=${sortBy}&order=${orderBy}&skip=${skip}&limit=${limit}&q=${searchValue}&fields=${searchFields}`
    ).then(resp => resp.data);
}

export const getSearchCount = (table, searchValue, searchFields) => {
    return http.get(`${apiUrl}/${table}/searchCount?q=${searchValue}&fields=${searchFields}`)
    .then(resp => typeof resp.data === 'number'? resp.data : 0);
}

export const getCount = (table) => http.get(`${apiUrl}/${table}/count`).then(resp => typeof resp.data === 'number'? resp.data : 0);

export const getItemById = (table, itemId) => http.get(`${apiUrl}/${table}/single/${itemId}`).then(resp => resp.data);

export const addItem = (table, item) => http.post(`${apiUrl}/${table}/add`, item).then(resp => resp.data);

export const uploadProdImg = (img, prodId = '') => http.post(`${apiUrl}/prods/addProdImg${prodId ? '?id=' + prodId : ''}`, img);

export const editItem = (table, itemId, item) => http.put(`${apiUrl}/${table}/edit?id=${itemId}`, item);

export const deleteItem = (table, itemId) => http.delete(`${apiUrl}/${table}/delete/${itemId}`);
