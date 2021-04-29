import { ADD_TO_CART, CHANGE_AMOUNT, editCart } from "../../redux-store/cart-reducer";
import { useState, useEffect } from "react"
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Product from "./product"
import store from "../../redux-store/redux-store";

const Products = ({prods, cart, editCart}) => {

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
        let isProdInCart = cart && cart.items[cart.items.findIndex(item => item.prod_id === prod_id)];
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

    const search = () => setFilteredData(products.filter(prod => (
        prod.name.toLowerCase().includes(searchValue.toLowerCase()) || 
        prod.description.toLowerCase().includes(searchValue.toLowerCase()))));

    return (
        <>
        <div className="top-space" style={{height: '35px'}}></div>
        <div className="container products-container">
            <form id="form" className="form-inline d-flex justify-content-center md-form form-sm active-pink active-pink-2 mt-2">
                <i id="form_btn" className="fas fa-search mb-3" aria-hidden="true"></i>
                <input 
                    id="search" 
                    className="form-control form-control-sm ml-3 w-75" 
                    type="text" 
                    placeholder="חפש"
                    aria-label="Search" 
                    onChange={({target: {value}}) => setSearchValue(value)}/>
            </form>
            <div id="parent" className="row">
                {(filteredData.length)? filteredData.map((prod) => <Product 
                    key={prod._id} 
                    prod={prod} 
                    fn={{handleAddToCart}}
                />):
                searchValue.length? 
                <div className="jumbotron w-100 p-5 m-md-5 mt-5 text-center text-secondary shadow">
                    <h4>{'לא נמצאו מוצרים התואמים למילות החיפוש שלך :('}</h4>
                </div>
                :''}
            </div>
        </div>
        <div className="bottom-space" style={{height: '30px'}}></div>
        </>
    )
}

const mapStateToProps = (state) => ({prods: state.products.prods, cart: state.cart && state.cart.cart});
const mapDispatchToProps = (dispatch) => ({editCart: (type, prod) => dispatch(editCart(type, prod))})
  
export default connect(mapStateToProps, mapDispatchToProps)(Products);