import store from "../../redux-store/redux-store";
import CartItem from "./cartItem";
import ProdDetails from "../products/prodDetails";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { checkParentsClass } from "../../services/generalFn";
import { useEffect, useState } from "react";
import { CART_INDEX, indexesManager } from "../../redux-store/indexes-reduser";
import { ADD_TO_CART, CHANGE_AMOUNT, UNSELECT_ALL, REMOVE_FROM_CART, REMOVE_SELECTED, SELECT, SELECT_ALL, selectAllHandler, selectHandler, editCart } from "../../redux-store/cart-reducer";

const Cart = ({cart: _cart, prods, selectedItems: _selectedItems, editCart, selectHandler, selectAllHandler}) => {

    const[cart, setCart] = useState(_cart);
    const[products, setProducts] = useState(prods);
    const[cartProds, setCartProds] = useState([]);
    const[selectedItems, setSelectedItems] = useState(_selectedItems);
    const[prod, setProd] = useState(null);
    const history = useHistory();

    const styles = {
        selectedItem: { backgroundColor: 'white', border: '3px solid rgb(15, 177, 15)' },
        notSelectedItem: { backgroundColor: 'rgb(240, 240, 240)', border: 'none' },
        emptyCart: {fontSize: '5rem', margin: '20px 10px', display: 'inline-block', color: 'white', textShadow: '0 0 4px gray'},
        emptyCartText: {display: 'inline-block', margin: '20px 10px'}
    }

    useEffect(() => {
        const subscription = store.subscribe(() => {
            const {products: {prods}, cart: {cart, selectedItems}} = store.getState();
            setCart(cart) || setSelectedItems(selectedItems) || setProducts(prods);
        });
        return subscription;
    }, []);

    useEffect(() => setCartProdsData(), [cart]);
    
    const setCartProdsData = () => {
        if(!cart.items) return;
        setCartProds(cart.items.map(item => {
            for(let prod of products) {
                if(prod._id !== item.prod_id) continue;
                let {amount, payment} = item;
                return {...prod, amount, payment};
            }
        }).reverse());
    }

    const handleAddToCart = (prod_id, price, amount = 1) => {
        let isProdInCart = cart.items[cart.items.findIndex(item => item.prod_id === prod_id)];
        if(isProdInCart) return handelChangeAmount(prod_id, amount)
        let prod = { prod_id, amount, payment: price * amount};
        updateCart(ADD_TO_CART, prod, 'התווסף');
    }

    const handelChangeAmount = (prodId, pointer) => {
        let {prod_id, amount, payment} = cart.items[cart.items.findIndex(prod => prod.prod_id === prodId)];
        let prod = {prod_id, amount, payment};
        if(prod.amount + pointer > 99 || prod.amount + pointer < 1) return;
        let price = products[products.findIndex(prod => prod._id === prodId)].price;
        prod.amount += pointer;
        prod.payment = price * prod.amount;
        updateCart(CHANGE_AMOUNT, prod, 'התעדכן');
    }

    const handelRemoveFromCart = (prodId) => {
        updateCart(REMOVE_FROM_CART, prodId, 'הוסר');
        if(selectedItems.includes(prodId)) selectHandler(REMOVE_SELECTED, prodId);
    }

    const updateCart = async (type, payload, msg) => {
        await editCart(type, payload);
        toastMessages(msg);
    }

    const toastMessages = (msg) => {
        let error = store.getState().cart.error;
        if(!error) toast(`הפריט ${msg} בהצלחה`);
        else toast.error('משהו השתבש נסה שוב מאוחר יותר');
    }

    const handleSelectItem = ({target: element} ,prodId) => {
        if(checkParentsClass(element, 'float-right')) return;
        if(element.className.includes('cart-img') && history.location.pathname === '/products') return;

        if(!selectedItems.includes(prodId)) selectHandler(SELECT, prodId);
        else selectHandler(REMOVE_SELECTED, prodId);
    }

    const handleSelectAll = () => {
        if(selectedItems.length === cartProds.length) selectAllHandler(UNSELECT_ALL, []);
        else selectAllHandler(SELECT_ALL, cartProds.map(prod => prod._id));
    }

    const removeSelectedFromCart = () => {
        selectedItems.forEach(async prodId => await editCart(REMOVE_FROM_CART, prodId));
        selectAllHandler(UNSELECT_ALL, []);
    }

    const calcFinalPayment = () => {
        let finalPayment = 0;
        cartProds.forEach(prod => selectedItems.includes(prod._id)? finalPayment += prod.payment: null);
        return finalPayment;
    }

    const closeCart = () => store.dispatch(indexesManager(CART_INDEX, false))

    const hideProd = () => setProd(null);

    const showProd = ({target:{attributes: {prodid: {nodeValue: prodId}}}}) => {
        if(history.location.pathname !== '/products') return;
        let prod = products.filter(prod => prod.name === prodId);
        setProd(...prod);
    }

    return (
        <div className="cart">
            {cartProds.length? <>
                <div className="cart-head cart-full p-2">
                    <div className="checkbox">
                        <div className="checkbox-border" onClick={handleSelectAll}>
                            {selectedItems.length === cartProds.length ? <div className="checkbox-body"></div>:''}
                        </div>
                        <small className="checkbox-text mr-2">
                            {selectedItems.length === cartProds.length ? 'הסר סימון' : 'סמן את כל הפריטים'}
                        </small>
                    </div>
                    {selectedItems.length? <div className="trash-box">
                        <small className="trash-text ml-2"> הסר פריטים מסומנים </small>
                        <i id="trash" className="fas fa-trash-alt" onClick={removeSelectedFromCart}></i>
                    </div>: ''}
                </div>

                <div id="cart-items" className="row">
                    {cartProds.length ?
                    cartProds.map(item => <CartItem 
                        key={item._id} 
                        item={item} 
                        fn={{handelChangeAmount, handelRemoveFromCart, handleSelectItem, showProd}}
                        style={selectedItems.includes(item._id)? styles.selectedItem: styles.notSelectedItem} 
                    />):''}
                </div>

                <div className="cart-footer pay-text">
                    <h6 className="text-right">
                        פריטים שנבחרו:  
                        <span className="items-amount text-info"> {selectedItems.length} </span>
                        <br/>
                        סך הכל לתשלום: 
                        <span className="final-price text-info">  
                            {' '}{calcFinalPayment().toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} ₪
                        </span> 
                    </h6>
                    <button id="buy-now" className="btn btn-dark" disabled={!selectedItems.length}>שלם עכשיו</button>
                </div>
            </>: 
            <>
                <h6 style={styles.emptyCartText}><b>עגלת הקניות שלך ריקה</b></h6>
                <i className="fas fa-shopping-cart" style={styles.emptyCart}></i>
            </>
            }
            <Link to="/products" className="cart-empty btn btn-dark w-100" onClick={closeCart}>המשך בקניות</Link>
            {prod &&
                <div className="dark justify-content-center align-items-center">
                    <ProdDetails prod={prod} fn={{hideProd, handleAddToCart}}/>
                </div>
            }
        </div>
    );
}

const mapStateToProps = ({cart: {cart, selectedItems}, products: {prods}}) => ({prods, cart, selectedItems});
const mapDispatchToProps = (dispatch) => ({
    editCart: (type, prod) => dispatch(editCart(type, prod)),
    selectHandler: (type, prodId) => dispatch(selectHandler(type, prodId)),
    selectAllHandler: (type, selectedItems) => dispatch(selectAllHandler(type, selectedItems))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);