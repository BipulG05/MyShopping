import './App.css';
import Header from "./components/layout/Header/Header" ;
import { BrowserRouter as Router,Route } from 'react-router-dom';
import webfont from 'webfontloader';
import React from 'react';
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



function App() {

  const {isAuthenticated,user} = useSelector((state) => state.user)


  React.useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      },
    });
    store.dispatch(loadUser())
  },[])
  return (
    <Router>
      <Header/>
        {isAuthenticated && <UserOptions user={user} />}
        <Route exact path='/' component={Home} />
        <Route exact path='/product/:id' component={ProductDetails} />
        <Route exact path='/products' component={Products} />
        <Route path='/products/:keyword' component={Products} />
        <Route exact path='/search' component={Search} />
        <ProtectedRoute exact path='/account' component={Profile}/>
        <Route exact path='/login' component={LoginSign} />

      <Footer/> 
   </Router>
  )
}

export default App;
