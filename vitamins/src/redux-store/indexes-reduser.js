export const 
    CART_INDEX  = 'CART_INDEX', 
    LOGIN_INDEX = 'LOGIN_INDEX', 
    USER_INDEX  = 'USER_INDEX', 
    ADMIN_INDEX = 'ADMIN_INDEX', 
    SIGNUP_DATA = 'SIGNUP_DATA';

// login index is for sign in card to show or hide, not for user is loged in
const initIndexesState = { cart: false, login: false, user: '', admin: false, signupData: {email: '', pass: ''} };

export const indexesRrducer = (state = initIndexesState, action) => {
    switch(action.type) {
        case CART_INDEX:  return { ...state, cart:  action.state };
        case LOGIN_INDEX: return { ...state, login: action.state };
        case USER_INDEX:  return { ...state, user:  action.state };
        case ADMIN_INDEX: return { ...state, admin: action.state };
        case SIGNUP_DATA: return { ...state, signupData: action.state };
        default: return state
    }
}
/**
 * 
 * @param {string} type The index name
 * @param {bool | string | object} state The index new value.
 */
export const indexesManager = (type, state) => ({type, state})