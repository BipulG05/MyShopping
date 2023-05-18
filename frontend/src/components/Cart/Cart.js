import React, { Fragment } from 'react';
import "./Cart.css";
import CartItemCard from './CartItemCard.js'
import {useSelector,useDispatch} from 'react-redux'
import { addToCart,removeFormCart } from '../../actions/cartAction';
import { useAlert } from 'react-alert';
import RemoveShoppingCarticon from '@material-ui/icons/RemoveShoppingCart';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';


const Cart = ({history}) => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state)=>state.cart)
    const alert = useAlert();
    const increaseQuentity = (id,quantity,stock)=>{
        const newQty = quantity +1;
        if(stock<=quantity){
            if(quantity>10){
                alert.info('Number of item can not be more then Ten(10)');
                return;
            }
            alert.info(`no of item presnet in stock ${quantity}`);
            return;
        }
        dispatch(addToCart(id,newQty));
    }
    const descQuentity = (id,quantity)=>{
        const newQty = quantity - 1;
        if(quantity<=1){
            alert.info('Number of items can not be less then one(1)');
            return;
        }
        dispatch(addToCart(id,newQty));
    }
    const deleteCartItem = (id) =>{
        dispatch(removeFormCart(id));
        alert.success('Item remove successfully');

    }
    const checkoutHandler = () =>{
        history.push("/login?redirect=shipping")
    }
  return (
        <Fragment>
            <MetaData title='Cart'/>
            {cartItems.length === 0 ? (
                <div className='emptyCart'>
                    <RemoveShoppingCarticon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ):(
            <Fragment>
                <div className='cartPage'>
                    <div className='cartHeader'>
                        <p>Product</p>
                        <p>Quentity</p>
                        <p>Subtotal</p>
                    </div>
                    {cartItems && cartItems.map((item)=>(
                        <div className='cartContainer' key={item.product}>
                        <CartItemCard item={item} deleteCartItem={deleteCartItem}/>
                        <div className='cardinput'>
                            <button onClick={()=>descQuentity(item.product,item.quantity)}>-</button>
                            <input type="number" value={item.quantity} readOnly/>
                            <button onClick={()=>increaseQuentity(item.product,item.quantity,item.stock)}>+</button>
                        </div>
                        <p className='cartSubtotal'>{`₹${item.price * item.quantity}`}</p>
                    </div>
                    ))}
                    <div className='cartGrossTotal'>
                        <div></div>
                        <div className='caetGrossTotalBox'>
                            <p>Gross Total</p>
                            <p>{`₹${
                                cartItems.reduce((acc,item)=>
                                    acc + item.quantity * item.price,
                                    0
                                )}`}</p>
                        </div>
                        <div></div>
                        <div className='checkOutBtn'>
                            <button onClick={checkoutHandler}>Check Out</button>
                        </div>
                    </div>
                </div>
            </Fragment>
            )}
        </Fragment>
        );
};

export default Cart