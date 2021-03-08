import http, { setTokenHeaders } from "./http";
import { apiUrl } from "../config.json";
import store from "../redux-store/redux-store";
import { ADD_TO_CART, editCart } from "../redux-store/cart-reducer";

export const createCart = (user_id) => http.post(apiUrl + '/carts/add', {user_id}).catch(err => console.dir(err));

export const getUserCart = () => http.get(apiUrl + '/carts/get').then(resp => resp.data);

export const addToCart = (prod) => http.put(apiUrl + '/carts/addItem', prod);

export const changeItemAmount = (prod) => http.put(apiUrl + '/carts/changeItem', prod);

export const removeFromCart = (prod_id) => http.put(apiUrl + '/carts/removeItem', {prod_id});

export const saveCartToDbOnLogin = () => {
    let cart = store.getState().cart.cart.items;
    if(!cart.length) return;
    setTokenHeaders();
    cart.forEach(prod => store.dispatch(editCart(ADD_TO_CART, prod)));
}

