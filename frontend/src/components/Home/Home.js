import React, { Fragment, useEffect } from 'react';
import './Home.css'
import Product from './ProductCard.js'
import MetaData from '../layout/MetaData';
import {clearError,getProduct} from '../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loder';
import { useAlert } from 'react-alert';
import Banner from './Banner';
 
function Home() {
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
        <Banner/> 
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