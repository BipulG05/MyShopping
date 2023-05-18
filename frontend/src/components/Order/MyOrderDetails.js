import React, { Fragment, useEffect } from 'react';
import './MyOrderDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { clearError, myOrderDetails } from '../../actions/orderAction';
import Loder from '../layout/Loader/Loder';
import { useAlert } from 'react-alert';

const MyOrderDetails = ({match}) => {
    const {order,error,loading} = useSelector((state)=>state.orderDetails);
    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(myOrderDetails(match.params.id));
    },[dispatch,alert,error,match.params.id]);
  return (
    <Fragment>
        {loading ? (<Loder/>) :
        (
            <Fragment>
                <MetaData title="Order Details" /> 
                <div className='orderDetailsPage'>
                    <div className='orderDetailsContainer'>
                        <Typography component="h1">Order #{order && order._id}</Typography>
                        <Typography>Shipping Info</Typography>
                        <div className='orderDetailsContainerBox'>
                            <div>
                                <p>Name: </p>
                                <span>{order.user && order.user.name}</span>
                            </div>
                            <div>
                                <p>Phone: </p>
                                <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address: </p>
                                <span>{order.shippingInfo && `${order.shippingInfo.address} , ${order.shippingInfo.city} , ${order.shippingInfo.state} , ${order.shippingInfo.pincode} , ${order.shippingInfo.country}`}</span>
                            </div>
                        </div>
                        <Typography>Payment</Typography> 
                        <div className='orderDetailsContainerBox'> 
                            <div> 
                                <p>
                                   Payment Status: 
                                </p>
                                <span
                                className={order.paymentInfo && order.paymentInfo.status==="succeeded" ? "greenColor":"redColor"}
                                >{order.paymentInfo && order.paymentInfo.status==="succeeded" ? "PAID" : "NOT PAID"}</span>
                            </div>
                            <div>
                                <p>Amount: </p>
                                <span>{order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>
                        <Typography>Order Status</Typography>
                        <div className='orderDetailsContainerBox'>
                            <div>
                                <p
                                className={order.orderStatus && order.orderStatus === "Processing" ? "yellowColor" : "greenColor"  } 
                                >
                                    {order.orderStatus && order.orderStatus}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='orderDetailsOrderItems'> 
                        <Typography>Order Items : </Typography>
                        <div className='orderDetailsOrderItemsContainer'> 
                            {
                                order.orderItems && 
                                order.orderItems.map((item)=>(
                                    <div key={item.product}>
                                        <img src={item.image} alt="product"/>
                                        <Link to={`/product/${item.product}`} >{item.name}</Link>{" "}
                                        <span>
                                            {item.quantity} X {item.price} = {" "}
                                            <b>₹ {item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))  
                            }
                        </div>
                    </div>
                </div>

            </Fragment>
        )
        }
    </Fragment>

  )
}

export default MyOrderDetails