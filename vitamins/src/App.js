import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Cart from './components/cart/cart';
import Footer from './components/footer';
import NavBar from './components/navBar';
import SignIn from './components/signin';
import AdminApp from './components/admin/adminApp';
import Products from './components/products/products';
import reduxIndex from './redux-store/index.redux';
import { Provider } from "react-redux";
import ProtectedRoute from './components/protectedRoute';
import { ToastContainer } from 'react-toastify';
import { checkParentsClass } from './services/generalFn';
import { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { checkIfAdmin, getCurrentUser } from './services/usersService';
import SignUp from './components/signup';

const { getProducts, getCart, indexesManager, store, CART_INDEX, LOGIN_INDEX, USER_INDEX, ADMIN_INDEX } = reduxIndex;

function App() {

  const [indexes, setIndexes] = useState({});
  
  useEffect(() => {
    (async () => {
      await store.dispatch(getProducts());
      getCurrentUser() && await store.dispatch(getCart());
    })();
    getCurrentUser() && store.dispatch(indexesManager(USER_INDEX, getCurrentUser().name));
    store.dispatch(indexesManager(ADMIN_INDEX, checkIfAdmin()));
    const subscription = store.subscribe(() => setIndexes(store.getState().indexes));
    return subscription;
  }, []);

  const pageNotFound = <div className="m-3 m-md-5 mt-5 pt-5">
    <div className="jumbotron p-5 m-md-5 mt-5 text-center text-danger shadow"><h3>Page Not Found - 404 Error</h3></div>
  </div>;

  const hideCartAndLogin = ({target: element}) => {
    if(indexes.cart) {
      if(!['cart', 'add-to-cart', 'dark', 'img-container'].filter(className => checkParentsClass(element, className)).length)
        store.dispatch(indexesManager(CART_INDEX, false));
    } else if(indexes.login) {
      if(!['connect', 'login'].filter(className => checkParentsClass(element, className)).length)
        store.dispatch(indexesManager(LOGIN_INDEX, false));
    } else return;
  }

  return (
    <div className="App" onClick={hideCartAndLogin} style={{minHeight: '100vh', position: 'relative'}}>
      <ToastContainer/>
      <Provider store={store}>
        <header><NavBar/></header>
        {indexes.cart && <Cart/>}
        {indexes.login && <SignIn/>}
        <Switch>
          <Route path="/home" exact component={Home}/>
          <Route path="/products" component={Products}/>
          <Route path="/sign-up" component={SignUp}/>
          <Route path="/page-not-found" render={() => pageNotFound}/>
          <ProtectedRoute path="/admin/prods" component={AdminApp} table={'prods'}></ProtectedRoute>
          <ProtectedRoute path="/admin/users" component={AdminApp} table={'users'}></ProtectedRoute>
          <Route path="/admin"><Redirect to="/admin/prods"/></Route>
          <Route path="/" exact><Redirect to="/home"/></Route>
          <Redirect to="/page-not-found"/>
        </Switch>
        <Footer/>
      </Provider>
    </div>
  );
}

export default App;
