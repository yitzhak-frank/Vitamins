import http from './http';
import {apiUrl} from '../config.json';
import { saveCartToDbOnLogin } from './cartService';

const TOKEN_KEY = 'token', ROLE = 'role', NAME = 'name';

export const getJwt = () => localStorage.getItem(TOKEN_KEY);

export const getCurrentUser = () => localStorage[TOKEN_KEY] ? ({ name: localStorage[NAME], role: localStorage[ROLE] }): null;

export const checkAdminToken = async () => {
    try {
        await http.get(apiUrl + '/users/checkAdmin');
        localStorage[ROLE] = 'admin';
    } catch(err) { delete localStorage[ROLE] }
}

export const checkIfAdmin = () => localStorage[ROLE] === 'admin';

export const userSignUp = (user) => http.post(apiUrl + '/users/signUp', user).then(resp => resp.data);

export const login = async(email, pass) => {
    let { data } = await http.post(apiUrl + '/users/login', { email, pass });
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(NAME, data.name);
    localStorage.setItem(ROLE, data.role);
    saveCartToDbOnLogin();
    window.location.reload();
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NAME);
    localStorage.removeItem(ROLE);
    window.location.reload();
};