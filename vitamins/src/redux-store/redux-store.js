import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import { cartReducer } from "./cart-reducer";
import { indexesRrducer } from "./indexes-reduser";
import { prodsReducer } from "./products-reducer";

const store = createStore(
    combineReducers({
        products: prodsReducer, 
        cart:     cartReducer, 
        indexes:  indexesRrducer
    }), applyMiddleware(thunkMiddleware));

export default store;
