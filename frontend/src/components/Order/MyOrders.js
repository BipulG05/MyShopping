import React, { Fragment, useEffect } from 'react';
import {DataGrid} from '@material-ui/data-grid';
import "./MyOrders.css";
import Launchicon from '@material-ui/icons/Launch'
import MetaData from '../layout/MetaData';
import Loder from '../layout/Loader/Loder';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError, myOrders } from '../../actions/orderAction';
import { Link } from 'react-router-dom';


const MyOrders = () => {
    const dispatch = useDispatch(); 
    const alert = useAlert();
    const {loading,error,orders} = useSelector((state)=>state.myOrders);
    const {user} = useSelector((state)=>state.user);
    const columns = [
        {
        field:"id", 
        headerName:"Order ID",
        minWidth:180,
        flex:0.6
    },
        { 
        field:"status",  
        headerName:"Status",
        cellClassName:(params)=>{ 
            return params.getValue(params.id,"status") === "Delivered"?"greenColor":"yellowColor";
        },
        minWidth:150,
        flex:0.5   
    }, 
        {
        field:"itemQty",
        flex:0.5,
        headerName:"Quantity",  
        minWidth:150,  
        type:"number",  
    },
        {
        field:"amount", 
        flex:0.5 ,
        headerName:"Amount", 
        minWidth:150,
        type:"number",
    },
        { 
        field:"action", 
        flex:0.5, 
        headerName:"Action",  
        minWidth:150,   
        type:"number",
        sortable:false, 
        renderCell:(params) =>{
            return(
                <Link to={`/order/${params.getValue(params.id,"id")}`}><Launchicon/> </Link>
            );
        },
    },

    ]; 
    const rows = []; 
    orders && orders.forEach((item,index)=>{
        rows.push({
            itemQty:item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice,
            
        });
    });

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(myOrders());

    },[dispatch,alert,error])


  return (
    <Fragment>
        <MetaData title={`${user.name} - Orders`}/>
        {loading ? (
            <Loder/>
        ):(
            <div className='myOrdersPage'>
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='myOrdersTable'
                autoHeight
                />
                <Typography id='myOrdersHeading'>{`${user.name?user.name.toUpperCase():"look"}${" "}'s Orders`}</Typography>
            </div>
        )}
    </Fragment>
  )
} 
   
export default MyOrders