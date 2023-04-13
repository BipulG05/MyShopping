import {CgMouse} from 'react-icons/cg';
import React, { Fragment, useEffect } from 'react';
import './Home.css'
import Product from './ProductCard.js'
import MetaData from '../layout/MetaData';
import {clearError,getProduct} from '../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loder';
import { useAlert } from 'react-alert';
 
function Home() {
  // const product ={
  //   name:"My laptop",
  //   images:[{url:"https://m.media-amazon.com/images/I/31sc06sN8DL.jpg"}],
  //   price:"3000", 
  //   _id:"4356768678"
  // }
  const alert = useAlert()
  const dispatch = useDispatch();
  const {loading,error,products} =useSelector(state => state.products);
  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct());
  },[dispatch, alert, error])


  return (
    <Fragment>
      {loading ? 
      <Loader/>
       :
      <Fragment>
      <MetaData title="MyShop"/>
      <div className="banner">
        <p>Welcome to Myshop</p> 
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
     
        <a href='#container'>
          <button>
            Scroll <CgMouse/>  
          </button> 
        </a>
      </div>
      <h2 className='homeHeading'>Featured Products</h2>
      <div className="container" id='container'>
        {products && products.map((product) => <Product product={product}/> )}
      </div>
    </Fragment>
      }
    </Fragment>
  )
}
 
export default Home