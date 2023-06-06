import React, { Fragment, useEffect } from 'react';
import './MyOrderDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { clearError, myOrderDetails, updateOrder } from '../../actions/orderAction';
import Loder from '../layout/Loader/Loder';
import { useAlert } from 'react-alert';
import {Button} from '@material-ui/core'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';


const MyOrderDetails = ({match}) => {
    const {order,error,loading} = useSelector((state)=>state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearError());
          } 
          if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
          }
        dispatch(myOrderDetails(match.params.id));
    },[dispatch,updateError,alert,isUpdated,error,match.params.id]);

    const updateOrderStatus = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", "cancel");

        dispatch(updateOrder(match.params.id, myForm));
    }


  return (
    <Fragment>
        {loading ? (<Loder/>) :
        (
            <Fragment>
                <MetaData title="Order Details" /> 
                <div className='orderDetailsPage'>
                    <div className='orderDetailsContainer'>
                        <Typography component="h1">Order id : {order && order._id}</Typography>
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
                    <div className='userOrderStatus'>
                        {order.orderStatus && (order.orderStatus !== "cancel" ||  order.orderStatus === "Processing") && 
                            <Button variant="outlined" onClick={updateOrderStatus}  color='primary'>Cancel Order</Button>
                        }
                        <Button variant="outlined"  color='primary'>Need help?</Button>
                    </div>
                </div>

            </Fragment>
        )
        }
    </Fragment>

  )
}

export default MyOrderDetails