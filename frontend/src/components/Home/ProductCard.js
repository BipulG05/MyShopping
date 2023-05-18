import React from 'react';
import {Link} from 'react-router-dom';
// import ReactStars from 'react-rating-stars-component';
import { Rating } from '@material-ui/lab';


function ProductCard({product}) {
    // const Options = {
    //     edit:false,
    //     color:"rgba(20,20,20,0.1)",
    //     activeColor:"tomato",
    //     size:window.innerWidth < 600 ? 7 : 23,
    //     value:product.ratings,
    //     isHalf:true,
    // };
    const Options = {
      size:"small",
      value:product.ratings,
      readOnly:true,
      precision:0.5,
  };
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <Rating {...Options} />
            <span className='productCard-span'>({product.numofreview} Reviews)</span>
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default ProductCard