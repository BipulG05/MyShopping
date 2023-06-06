import React from 'react';
import {Link} from 'react-router-dom';
import { Rating } from '@material-ui/lab';


function ProductCard({product}) {
    const Options = {
      size:"small",
      value:product.ratings,
      readOnly:true,
      precision:0.5,
  };
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img id='prodimg' src={product.images[0].url} height="150" alt={product.name} />
        <p>{`${product.name.toUpperCase().slice(0, 22)} ...`}</p>
        <div>
            <Rating {...Options} />
            <span className='productCard-span'>({product.numofreview} Reviews)</span>
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default ProductCard