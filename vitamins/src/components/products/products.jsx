import { useState, useEffect } from "react"
import store from "../../redux-store/redux-store";
import { connect } from "react-redux";
import ProdDetails from "./prodDetails";
import Product from "./product"
import { ADD_TO_CART, CHANGE_AMOUNT, editCart } from "../../redux-store/cart-reducer";
import { toast } from "react-toastify";

const Products = ({prods, cart, editCart}) => {

    const [prod, setProd] = useState(null);
    const [products, setProducts] = useState(prods);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        let subscription = store.subscribe(() => setProducts(store.getState().products.prods));
        return subscription;
    }, []);
    
    useEffect(() => search(), [searchValue]);
    useEffect(() => setFilteredData(products), [products]);

    const handleAddToCart = async (prod_id, price, amount = 1) => {
        let isProdInCart = cart.items[cart.items.findIndex(item => item.prod_id === prod_id)];
        if(isProdInCart) {
            let { prod_id, payment} = isProdInCart;
            let prod = {prod_id, amount: isProdInCart.amount, payment};
            prod.amount += amount;
            prod.payment = price * isProdInCart.amount;
            await editCart(CHANGE_AMOUNT, prod);
            toastMessages('התעדכן');
        } else {
            let prod = { prod_id, amount, payment: price * amount};
            await editCart(ADD_TO_CART, prod);
            toastMessages('התווסף');
        }
    }

    const toastMessages = (msg) => {
        let error = store.getState().cart.error;
        if(!error) toast(`הפריט ${msg} בהצלחה`);
        else toast.error('משהו השתבש נסה שוב מאוחר יותר');
    }

    const hideProd = () => setProd(null);

    const showProd = ({target:{attributes: {prodid: {nodeValue: prodId}}}}) => {
        let prod = products.filter(prod => prod.name === prodId);
        setProd(...prod);
    }

    const search = () => setFilteredData(products.filter(prod => (
        prod.name.toLowerCase().includes(searchValue.toLowerCase()) || 
        prod.description.toLowerCase().includes(searchValue.toLowerCase()))));

    return (
        <div className="container products-container mt-5">
            <form id="form" className="form-inline d-flex justify-content-center md-form form-sm active-pink active-pink-2 mt-2">
                <i id="form_btn" className="fas fa-search mb-3" aria-hidden="true"></i>
                <input id="search" className="form-control form-control-sm ml-3 w-75" type="text" placeholder="חפש"
                    aria-label="Search" onChange={({target: {value}}) => setSearchValue(value)}/>
            </form>
            <div id="parent" className="row">
                {(filteredData.length)? filteredData.map((prod) => <Product key={prod._id} prod={prod} fn={{showProd, handleAddToCart}}/>):searchValue.length? <div className="jumbotron w-100 p-5 m-md-5 mt-5 text-center text-secondary shadow">
                    <h4>{'לא נמצאו מוצרים התואמים למילות החיפוש שלך :('}</h4>
                </div>
                :''}
            </div>
            {prod &&
                <div className="dark justify-content-center align-items-center">
                    <ProdDetails prod={prod} fn={{hideProd, handleAddToCart}}/>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({prods: state.products.prods, cart: state.cart.cart});
const mapDispatchToProps = (dispatch) => ({editCart: (type, prod) => dispatch(editCart(type, prod))})
  
export default connect(mapStateToProps, mapDispatchToProps)(Products);