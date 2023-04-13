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



function App() {
  React.useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  })
  return (
    <Router>
      <Header/>
        <Route exact path='/' component={Home} />
        <Route exact path='/product/:id' component={ProductDetails} />
        <Route exact path='/products' component={Products} />
        <Route path='/products/:keyword' component={Products} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/login' component={LoginSign} />

      <Footer/> 
   </Router>
  )
}

export default App;
