import { ADD_TO_CART, CHANGE_AMOUNT, editCart } from "../../redux-store/cart-reducer";
import { getProductById } from "../../services/productsService";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import useWindowSize from '../../hooks/screenSize';
import store from "../../redux-store/redux-store";
import Tooltip from "../common/tooltip";
import BackBtn from "../common/backBtn";
import useScrollPosition from "../../hooks/scrollPosition";
import { mobileAndTabletCheck } from "../../services/generalFn";
import { useHistory } from "react-router";

const ProdDetails = ({match: {params: { id: prodId }}, editCart, cart}) => {

    const[amount, setAmount] = useState(1);
    const[product, setProduct] = useState({});
    const[iOver, setIOver] = useState(false);
    const[tooltip, setTooltip] = useState(null);
    const[isMobile] = useState(mobileAndTabletCheck());

    const history    = useHistory();
    const { width }  = useWindowSize();
    const { bottom } = useScrollPosition();
    
    const styles = {
        image:   {background: `url(${product.image})no-repeat center`, width: '100%', height: '50vh', maxWidth: '800px'},
        more_info: {direction: 'ltr', maxWidth: '800px', columnCount: width > 700 ? 2 : 1, whiteSpace: 'pre-wrap'},
        bottom: {height: '75px', backgroundColor: '#ddd', position: isMobile ? 'unset' : 'fixed', bottom: bottom > 100 ? 0 : 100 - bottom, width: '100%'},
        inner:   {maxWidth: '800px', height: '75px'},
        amount:  {height: '25px', width: '25px', border: '1px solid gray', fontSize: '14px', outline: 'none',backgroundColor: '#f0f0f0'},
        buttons: {backgroundColor: '#c8c8c8', fontWeight: 'bold', cursor: 'pointer'},
        minus:   {borderBottomLeftRadius: '7px', borderTopLeftRadius: '7px'},
        plus:    {borderBottomRightRadius: '7px', borderTopRightRadius: '7px'},
        i: {color: 'white', padding: '18px', fontSize: '1.3rem', borderRadius: '50%', backgroundColor: '#aaaaaa', transition: '0.5s'},
        iOnHover: {transform: 'scale(1.1)', backgroundColor: '#585858'}
    }

    useEffect(() => getProduct(), []);

    useEffect(() =>  history.listen((location) => {
        let url = location.pathname.split('/');
        let id  = url[url.length -1];
        getProduct(id);
    }), []);

    const getProduct = async (id = prodId) => {
        let prod = await getProductById(id);
        setProduct(prod);
        window.scroll({top:1});
    }

    const changeAmount = (pointer) => {
        if(amount + pointer > 99 || amount + pointer < 1) return;
        setAmount(amount => amount + pointer);
    }

    const handleAddToCart = async () => {
        let isProdInCart = cart.items[cart.items.findIndex(item => item.prod_id === product._id)];
        if(isProdInCart) {
            let { prod_id, payment} = isProdInCart;
            let prod = {prod_id, amount: isProdInCart.amount, payment};
            prod.amount += amount;
            prod.payment = price * isProdInCart.amount;
            await editCart(CHANGE_AMOUNT, prod);
            toastMessages('????????????');
        } else {
            let prod = { prod_id: product._id, amount, payment: price * amount};
            await editCart(ADD_TO_CART, prod);
            toastMessages('????????????');
        }
    }

    const toastMessages = (msg) => {
        let error = store.getState().cart.error;
        if(!error) toast(`?????????? ${msg} ????????????`);
        else toast.error('???????? ?????????? ?????? ?????? ?????????? ????????');
    }

    const { name, description, more_info, price } = product;

    return (
        <>
        {product._id && 
        <>
        <BackBtn/>
        <div className="top-space" style={{height: '45px'}}></div>
        <h1 className="text-center text-success pt-5">{name}</h1>
        <h5 className="mt-2 text-center text-info">{description}</h5>
        <div 
            className="img-container mt-2 mx-auto"
            style={styles.image}
        ></div>
        <div className="p-3 pt-5 p-lg-5 mx-auto" style={styles.more_info}>
            <p className="text-justify text-dark">{more_info}</p>
        </div>
        <div className="bottom" style={styles.bottom}>
            <div className="inner d-flex align-items-center justify-content-around mx-auto" style={styles.inner}>
                <div className="amount d-flex">
                    <div 
                        className="increace plus d-flex justify-content-center" 
                        style={{...styles.amount, ...styles.buttons, ...styles.plus}} 
                        onClick={() => changeAmount(1)}
                    >+</div>
                    <div className="text-center current-amount d-flex justify-content-center" style={styles.amount}>{amount}</div>
                    <div 
                        className="reduce minus d-flex justify-content-center" 
                        style={{...styles.amount, ...styles.buttons, ...styles.minus}} 
                        onClick={() => changeAmount(-1)}
                    >-</div>
                </div>
                <h5 className="mt-2 text-center text-success original-price">{price} ???</h5>
                {amount > 1 && <span className="text-info prod-final-price">
                    ???? ?????? {(price * amount).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} ???
                </span>}      
                <i 
                    className="fas fa-cart-plus shadow add-to-cart-2"
                    style={iOver ? {...styles.i,  ...styles.iOnHover} : styles.i}
                    onMouseEnter={() => setIOver(true)}
                    onMouseMove={setTooltip}
                    onMouseLeave={() => {
                        setIOver(false);
                        setTooltip(null);
                    }}
                    onClick={() => handleAddToCart()}
                ></i>
            </div>
        </div>
        <div className="footer-and-bottom-space" style={{height: isMobile ? '100px' : '175px'}}></div>
        </>}
        {tooltip ? <Tooltip content={'???????? ?????????? ????????????'} event={tooltip}/>:null}
        </>
    );
}

const mapStateToProps = (state) => ({cart: state.cart.cart});
const mapDispatchToProps = (dispatch) => ({editCart: (type, prod) => dispatch(editCart(type, prod))})
  
export default connect(mapStateToProps, mapDispatchToProps)(ProdDetails);