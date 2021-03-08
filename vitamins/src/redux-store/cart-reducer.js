import { addToCart, changeItemAmount, getUserCart, removeFromCart } from "../services/cartService";
import { getCurrentUser } from "../services/usersService";

export const
    GET_CART         = 'GET_CART', 
    EDIT_CART        = 'EDIT_CART', 
    ADD_TO_CART      = 'ADD_TO_CART', 
    CHANGE_AMOUNT    = 'CHANGE_AMOUNT', 
    REMOVE_FROM_CART = 'REMOVE_FROM_CART', 
    SELECT           = 'SELECT', 
    SELECT_ALL       = 'SELECT_ALL', 
    UNSELECT_ALL     = 'UNSELECT_ALL',
    REMOVE_SELECTED  = 'REMOVE_SELECTED';

const initCartState = {loading: false, error: '', cart: {items: []}, selectedItems: []};

export const cartReducer = (state = initCartState, action) => {
    switch(action.type) {
        case GET_CART: return { ...state, ...action.payload};
        case EDIT_CART: return { ...state, ...action.payload};
        case ADD_TO_CART: return { ...state, cart: { items: [...state.cart.items, action.prod] } };
        case CHANGE_AMOUNT: return {...state,cart:{items:state.cart.items.map(prod=>prod.prod_id===action.prod.prod_id?action.prod:prod)}};
        case REMOVE_FROM_CART: return { ...state, cart: {items: state.cart.items.filter(prod => prod.prod_id !== action.prod)}};
        case SELECT: return { ...state, selectedItems: [...state.selectedItems, action.prodId] };
        case SELECT_ALL: return { ...state, selectedItems: action.selectedItems };
        case UNSELECT_ALL: return { ...state, selectedItems: action.selectedItems };
        case REMOVE_SELECTED: return { ...state, selectedItems: state.selectedItems.filter(prod => prod !== action.prodId) };
        default: return state;
    }  
}

export const getCart = () => {
    let payload, type = GET_CART;
    return async (dispatch) => {  
        payload = {loading: true, error: ''};
        dispatch({type, payload});
        try {
            let cart = await getUserCart();
            payload = {loading: false, cart, error: ''};
            dispatch({type, payload});
        } catch(error) {
            payload = {loading: false, cart: [], error: error};
            dispatch({type, payload});
        }
    }
}

export const editCart = (type, prod) => {
    let payload;
    if(!getCurrentUser()) return (dispatch) => dispatch({type, prod});
    return async (dispatch) => { 
        payload = {loading: true, error: ''};
        dispatch({type: EDIT_CART, payload});
        try {
            await (getAction(type)(prod));
            dispatch({type, prod});
        } catch(error) {
            payload = {loading: false, error: error};
            dispatch({type: EDIT_CART, payload});
        }
    }
}

const getAction = (type) => {
    switch(type) {
        case ADD_TO_CART: return addToCart;
        case CHANGE_AMOUNT: return changeItemAmount;
        case REMOVE_FROM_CART: return removeFromCart;
        default: return;
    }
}

export const selectHandler = (type, prodId) => ({type, prodId});

export const selectAllHandler = (type, selectedItems) => ({type, selectedItems});