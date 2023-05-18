import './App.css';
import Header from "./components/layout/Header/Header" ;
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import webfont from 'webfontloader';
import React, { useEffect, useState } from 'react';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails'
import Products from './components/Products/Products.js'
import Search from './components/Search/Search'
import LoginSign from './components/User/LoginSign';
import store from './store'
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions.js'
import Profile from './components/User/Profile.js'
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js';
import ResetPassword from './components/User/ResetPassword.js';
import Cart from './components/Cart/Cart.js';
import Shipping from './components/Cart/Shipping.js'
import ConfirmOrder from './components/Cart/ConfirmOrder.js';
import axios from 'axios';
import Payment from './components/Cart/Payment.js';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import orderSuccess from './components/Cart/orderSuccess.js'; 
import MyOrders from './components/Order/MyOrders.js'
import MyOrderDetails from './components/Order/MyOrderDetails.js'
import Dashboard from './components/Admin/Dashboard.js';
import ProductList from './components/Admin/ProductList.js'
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct.js';
import OrdersList from './components/Admin/OrdersList.js';
import UpdateOrder from './components/Admin/UpdateOrder.js';
import UsersList from './components/Admin/UsersList.js';
import UpdateUser from './components/Admin/UpdateUser.js';
import ProductReviews from './components/Admin/ProductReviews.js';
import Categories from './components/Home/Categories.js';


function App() {
 
  const {isAuthenticated,user} = useSelector((state) => state.user);
  const [stripeApiKey,setStripeApiKey] = useState("");
  async function getStripeApiKey(){
    const {data}= await axios.get('/api/v1/stripeApiKey');
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka","Cursive"] 
      },
    });
    store.dispatch(loadUser()); 
    getStripeApiKey();
  },[])
  return (
    <Router>
      <Header/>
        {isAuthenticated && <UserOptions user={user} />}
        <Route exact path='/' component={Home} />
        <Route exact path='/categories' component={Categories} />
        <Route exact path='/product/:id' component={ProductDetails} /> 
        <Route exact path='/products' component={Products} />
        <Route path='/products/:keyword' component={Products} />
        <Route exact path='/search' component={Search} />
        <ProtectedRoute exact path='/account' component={Profile}/>
        <ProtectedRoute exact path='/me/update' component={UpdateProfile}/>
        <ProtectedRoute exact path='/password/update' component={UpdatePassword}/>
        <Route exact path='/cart' component={Cart}/>
        <ProtectedRoute exact path='/shipping' component={Shipping}/>
        <Route exact path='/password/forgot' component={ForgotPassword}/>
        <Route exact path='/password/reset/:token' component={ResetPassword}/>
        <Route exact path='/login' component={LoginSign} />
        {stripeApiKey && ( <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path='/process/payment' component={Payment}/>
        </Elements>)}
        <ProtectedRoute exact path='/success' component={orderSuccess}/>
        <ProtectedRoute exact path='/orders' component={MyOrders}/>
        <Switch>
          <ProtectedRoute exact path='/order/confirm' component={ConfirmOrder}/>
          <ProtectedRoute exact path='/order/:id' component={MyOrderDetails}/>
        </Switch>
        <ProtectedRoute isAdmin={true} exact path='/admin/dashboard' component={Dashboard}/>
        <ProtectedRoute isAdmin={true} exact path='/admin/products' component={ProductList}/>
        <ProtectedRoute isAdmin={true} exact path='/admin/product' component={NewProduct}/>
        <ProtectedRoute isAdmin={true} exact path='/admin/product/:id' component={UpdateProduct}/>
        <ProtectedRoute isAdmin={true} exact path='/admin/orders' component={OrdersList}/>
        <ProtectedRoute isAdmin={true} exact path='/admin/order/:id' component={UpdateOrder}/>
        <ProtectedRoute isAdmin={true} exact path='/admin/users' component={UsersList}/>
        <ProtectedRoute isAdmin={true} exact path='/admin/user/:id' component={UpdateUser}/>
        <ProtectedRoute isAdmin={true} exact path='/admin/reviews' component={ProductReviews}/>
        


        
      <Footer/> 
   </Router>
  )
}

export default App;
