import http, { setTokenHeaders } from './http';
import {apiUrl} from '../config.json';
import { saveCartToDbOnLogin } from './cartService';
import jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'token', ROLE = 'role', NAME = 'name';

export const getJwt = () => localStorage.getItem(TOKEN_KEY);

export const getCurrentUser = () => {
    try {
        let user = jwtDecode(localStorage[TOKEN_KEY]);
        user.name = localStorage[NAME];
        return user;
    } catch(err) {
        return null;
    }
}

export const checkIfAdmin = () => {
    let user = getCurrentUser();
    if(user && user.role === 'admin') return true;
    return false;
}

export const userSignUp = (user) => http.post(apiUrl + '/users/signUp', user).then(resp => resp.data);

export const login = async(email, pass) => {
    let { data } = await http.post(apiUrl + '/users/login', { email, pass });
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(NAME, data.name);
    localStorage.setItem(ROLE, data.role);
    setTokenHeaders();
    saveCartToDbOnLogin();
    window.location.reload();
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NAME);
    localStorage.removeItem(ROLE);
    window.location.reload();
};