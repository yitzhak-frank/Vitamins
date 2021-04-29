import { CART_INDEX, indexesManager, LOGIN_INDEX } from "../redux-store/indexes-reduser";
import { NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import useWindowSize from '../hooks/screenSize';
import logoIcon from '../images/favicon.png';

const NavBar = ({indexes, cartItems, indexesManager}) => {

    const history = useHistory();
    const { width } = useWindowSize();
    const[hamburger, setHamburger] = useState(false);
    const[hamburgerHovar, setHamburgerHover] = useState(false);
    const[url, setUrl] = useState(history.location.pathname);
    const[logoOver, setLogoOver] = useState(false)

    const calcLogoPosition = () => {
        let iconsWidth  = 190;
        let logoWidth   = width > 420 ? 120 : 0;
        let navbarWidtn = width > 767 ? 385 : 110;
        return (iconsWidth + (width - iconsWidth - navbarWidtn - (logoWidth/2))/2);
    }

    const styles = {
        icons: {position: 'fixed', top: '20px', left: '20px'},
        hamburger: {cursor: 'pointer', height: '55px', width: '60px', position: 'fixed', top: '10px', right: '10px', zIndex: 9, borderRadius: '10px', padding: '7.5px 10px', boxShadow: '0 0 6px gray', transition: '0.4s'},
        bars: {width: '40px', height: '5px', margin: '6px 0', transition: '0.4s', backgroundColor: hamburgerHovar ? 'white' : 'silver'},
        bar1: {width: '40px', height: '5px', margin: '6px 0', transition: '0.4s', backgroundColor: hamburgerHovar ? 'white' : 'silver', transform: 'rotate(-45deg) translate(-9px, 6px)'},
        bar2: {width: '40px', height: '5px', margin: '6px 0', transition: '0.4s', backgroundColor: hamburgerHovar ? 'white' : 'silver', opacity: 0},
        bar3: {width: '40px', height: '5px', margin: '6px 0', transition: '0.4s', backgroundColor: hamburgerHovar ? 'white' : 'silver', transform: 'rotate(45deg) translate(-8px, -8px)'},
        logo: {position: 'fixed', left: calcLogoPosition(), opacity: logoOver ? 1 : 0.7, transition: '0.5s'},
        logoTxt: {display: width <= 420 && 'none'},
        logoImg: {height: '50px',width: '50px'},
        loginTxt: {width: '90px', overflow: 'auto', whiteSpace: 'nowrap'}
    }

    useEffect(() => history.listen((location) => setUrl(location.pathname)), [history]);

    const togglCart = () => {
        indexesManager(CART_INDEX, !indexes.cart);
        indexes.login && indexesManager(LOGIN_INDEX, false);
    };
    const togglLogin = () => {
        indexesManager(LOGIN_INDEX, !indexes.login);
        indexes.cart &&  indexesManager(CART_INDEX, false);
    };

    const toggleHamburger = () => {
        setHamburger(!hamburger);
        if(!hamburger) for(let i = 1; i <= 3; i++) delete styles[`bar${i}`];
        else {
            styles.bar1 = {...styles.bars, transform: 'rotate(-45deg) translate(-9px, 6px)'};
            styles.bar2 = {...styles.bars, opacity: 0};
            styles.bar3 = {...styles.bars, transform: 'rotate(45deg) translate(-8px, -8px)'};
        }
    }

    return (
        <nav className="navbar navbar-dark bg-dark shadows p-0">
            <div 
                id="hamburger" 
                className="hamburger-container d-block d-md-none bg-dark" 
                style={!hamburger ? {...styles.hamburger} : {...styles.hamburger, boxShadow: 'none'}}
                onMouseEnter={() => setHamburgerHover(true)}
                onMouseLeave={() => setHamburgerHover(false)}
                onClick={toggleHamburger}
            >
                <div className="bar1" style={hamburger ? styles.bar1 : styles.bars}></div>
                <div className="bar2" style={hamburger ? styles.bar2 : styles.bars}></div>
                <div className="bar3" style={hamburger ? styles.bar3 : styles.bars}></div>
            </div>

            <div className={hamburger && width < 768 ? 
                "navbar-nav d-block bg-dark w-100 text-right mt-3 pb-3 pt-5 px-3" : 
                "navbar-nav d-none d-md-flex px-3"
            }> 
                <NavLink to="/home"     className="nav-link mx-2" onClick={() => setHamburger(false)}>בית     </NavLink>
                <NavLink to="/about"    className="nav-link mx-2" onClick={() => setHamburger(false)}>אודותינו</NavLink>
                <NavLink to="/products" className="nav-link mx-2" onClick={() => setHamburger(false)}>מוצרים  </NavLink>
                <NavLink to="/contact"  className="nav-link mx-2" onClick={() => setHamburger(false)}>צור קשר </NavLink>
                {indexes.admin && 
                <NavLink 
                    to="/admin" 
                    className="nav-link mx-2"
                    style={{'color': url.includes('admin') && 'white'}}
                    onClick={() => setHamburger(false)}
                >איזור ניהול</NavLink>}
            </div>

            <NavLink 
                to="/home"
                className="logo d-flex align-items-center" 
                style={styles.logo}
                onMouseEnter={() => setLogoOver(true)}
                onMouseLeave={() => setLogoOver(false)}
            >
                <h5 className="text-light ml-1 mt-2" style={styles.logoTxt}>ויטמינים</h5>
                <img src={logoIcon} alt="logo" style={styles.logoImg}/>
            </NavLink>
            <div className="icons d-flex" style={styles.icons}>
                <span 
                    className={indexes.login? "active navbar-nav connect ml-3": "navbar-nav connect ml-3" } 
                    onClick={togglLogin}
                >
                    <div className="nav-link" id="login-text" style={styles.loginTxt}>
                        {indexes.user || 'התחבר'}
                    </div>
                    <i className="fas fa-user-circle"></i>
                </span>
                <i 
                    className={indexes.cart? "active fas fa-shopping-cart": "fas fa-shopping-cart"} 
                    onClick={togglCart}
                >{cartItems ? <span className="items-count">{cartItems}</span>:''}</i>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => ({indexes: state.indexes, cartItems: state.cart.cart.items ? state.cart.cart.items.length : 0});
const mapDispatchToProps = (dispatch) => ({indexesManager: (type, state) => dispatch(indexesManager(type, state))})
  
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
