import * as cartReducer from './cart-reducer';
import * as prodsReducer from './products-reducer';
import * as indexesReducer from './indexes-reduser';
import store from './redux-store';

const reduxIndex = {
    ...cartReducer,
    ...prodsReducer,
    ...indexesReducer,
    store
}

export default reduxIndex;