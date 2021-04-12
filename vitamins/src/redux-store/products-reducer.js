import { getAllProducts } from "../services/productsService";

export const GET_PRODS = 'GET_PRODS';

const initProdsState = {loading: false, error: '', prods:[]};

export const prodsReducer = (state = initProdsState, action) => {
    switch(action.type) {
        case GET_PRODS: return { ...state, ...action.payload };
        default: return state;
    }
}

/**
 * Function that gets the products data from the db to redux-store.
 */
export const getProducts = () => {
    let payload, type = GET_PRODS;
    return async (dispatch) => {  
        payload = {loading: true, error: ''};
        dispatch({type, payload});
        try {
            let prods = await getAllProducts();
            payload = {loading: false, prods, error: ''};
            dispatch({type, payload});
        } catch(error) {
            payload = {loading: false, error: error};
            dispatch({type, payload});
        }
    }
}