import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useSelector,useDispatch } from 'react-redux';
import { clearError,getProduct } from '../../actions/productAction';
import Loder from '../layout/Loader/Loder';
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData';


const categories = [
    "laptop",
    "footware",
    "mobile",
    "camera",
    "phone"
]

const Products = ({match}) => {

    const dispatch = useDispatch();
    const [currentPage,setCurrentPage]=useState(1);
    const [price,setPrice]=useState([0,250000]);
    const [category,setCategory]=useState("");
    const [ratings,serRating]=useState(0);
    // const [visible, setVisible] = useState(false)
    const[Toggle,setToggle] = useState(false);
    const alert =useAlert();

    const {products,loading,error,productsCount,resultPerPage,filterProductsCount} =useSelector((state) => state.products);
    const keyword = match.params.keyword;
    const setCurrentPageNo = (e) =>{
        setCurrentPage(e);
    }
    const priceHandler = (event,newPrice) => {
        setPrice(newPrice);
    }
    const toggleHandler = (ev,toggleV) =>{
        if(Toggle){
            setToggle(false);
        }else{
            setToggle(true);
        }
    }
    useEffect (() => {
        if(error){
            alert.error(error);
            dispatch(clearError())
        }
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
    },[dispatch,keyword,currentPage,price,category,ratings,alert,error])

    let count = filterProductsCount;

  return (
    <Fragment>
        { loading ? (
        <Loder />
        ):(
        <Fragment>
            <MetaData title={`${category} Products ....MyShop`}/>

            <h2 className='ProductsHeading'>Products</h2>
            <div className='products'>
                {products && 
                products.map((product) =>(
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <div className='filterBox'>
                <button className='filterButton'  onClick={toggleHandler} >Filers</button>
                {Toggle && 
                <div>
                    <Typography>Price</Typography>
                    <Slider 
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        min={0}
                        max={250000}
                    />
                    <Typography>Categories</Typography>
                    <ul className='categoryBox'>
                        {categories.map((category)=>(
                            <li
                            className='category-link'
                            key={category}
                            onClick={()=>setCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                    <fieldset>
                        <Typography component="legend">Ratings About</Typography>
                        <Slider
                        value={ratings}
                        onChange={(e,newRating) => {
                            serRating(newRating);
                        }}
                        min={0}
                        max={5}
                        aria-labelledby='continuous-slider'
                        valueLabelDisplay='auto'
                        />
                    </fieldset>
                </div>
                }
            </div>
            
            {resultPerPage < count && 
            <div className='pageinationBox'>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                />
            </div>
            }
        </Fragment>
        )}
    </Fragment>
  );
};

export default Products