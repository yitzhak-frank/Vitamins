import http from "./http";
import store from "../redux-store/redux-store";
import { apiUrl } from "../config.json";
import { ADD_TO_CART, editCart } from "../redux-store/cart-reducer";

export const createCart = (user_id) => http.post(apiUrl + '/carts/add', {user_id});

export const getUserCart = () => http.get(apiUrl + '/carts/get').then(resp => resp.data);

export const addToCart = (prod) => http.patch(apiUrl + '/carts/addItem', prod);

export const changeItemAmount = (prod) => http.patch(apiUrl + '/carts/changeItem', prod);

export const removeFromCart = (prod_id) => http.patch(apiUrl + '/carts/removeItem', {prod_id});

export const saveCartToDbOnLogin = () => {
    let cart = store.getState().cart.cart.items;
    if(!cart.length) return;
    cart.forEach(prod => store.dispatch(editCart(ADD_TO_CART, prod)));
}

