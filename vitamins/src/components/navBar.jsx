import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { CART_INDEX, indexesManager, LOGIN_INDEX } from "../redux-store/indexes-reduser";

const NavBar = ({indexes, cartItems, indexesManager}) => {

    const history = useHistory();
    const[url, setUrl] = useState(history.location.pathname);

    useEffect(() => history.listen((location) => setUrl(location.pathname)) , [history]);

    const togglCart = () => {
        indexesManager(CART_INDEX, !indexes.cart);
        indexes.login && indexesManager(LOGIN_INDEX, false);
    };
    const togglLogin = () => {
        indexesManager(LOGIN_INDEX, !indexes.login);
        indexes.cart &&  indexesManager(CART_INDEX, false);
    };

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark shadows">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink to="/home" className="nav-link">בית</NavLink>
                        <div className="nav-link">אודותינו</div>
                        <NavLink to="/products" className="nav-link">מוצרים</NavLink>
                        <div className="nav-link">צור קשר</div>
                        {indexes.admin && <NavLink 
                            to="admin" 
                            className="nav-link"
                            style={{'color': url.includes('admin') && 'white'}}
                        >איזור ניהול</NavLink>}
                    </div>
                </div>
                <span className={indexes.login? "active navbar-nav connect ml-3": "navbar-nav connect ml-3" } 
                    onClick={togglLogin}>
                    <div className="nav-link" id="login-text">
                        {indexes.user || 'התחבר'}
                    </div>
                    <i className="fas fa-user-circle"></i>
                </span>
                <i className={indexes.cart? "active fas fa-shopping-cart float-left": "fas fa-shopping-cart float-left"} 
                    onClick={togglCart}>
                    {cartItems ? <span className="items-count">{cartItems}</span>:''}
                </i>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => ({indexes: state.indexes, cartItems: state.cart.cart.items ? state.cart.cart.items.length : 0});
const mapDispatchToProps = (dispatch) => ({indexesManager: (type, state) => dispatch(indexesManager(type, state))})
  
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
