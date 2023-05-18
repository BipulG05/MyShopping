import { DataGrid } from '@material-ui/data-grid';
import React, { Fragment, useEffect } from 'react';
import "./ProductList.css"
import { useDispatch, useSelector } from 'react-redux';
  import { Link } from "react-router-dom";
  import { useAlert } from "react-alert";
  import { Button } from "@material-ui/core";
  import MetaData from "../layout/MetaData";
  import EditIcon from "@material-ui/icons/Edit";
  import DeleteIcon from "@material-ui/icons/Delete";
  import SideBar from "./Sidebar";
import { deleteOrder, getAllOrders,clearError } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';

const OrdersList = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,orders} = useSelector((state)=>state.allOrders);
    const {isDeleted,error :deleteError} = useSelector((state)=>state.order)

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        if(isDeleted){
          alert.success("Odrer deleted successfully");
          history.push("/admin/orders");
          dispatch({type:DELETE_ORDER_RESET});
        }
        if(deleteError){
          alert.error(deleteError);
          dispatch(clearError())
        }
        dispatch(getAllOrders());
    },[dispatch,error,alert,isDeleted,deleteError,history])

    const deleteOrderHandler = (id) =>{
      dispatch(deleteOrder(id));

    };
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
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() => 
                    deleteOrderHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
      const rows = [];
      orders && 
      orders.forEach((item)=>{
        rows.push({
            itemQty:item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice,
        });
      });
  return (
    <Fragment>
        <MetaData title={`ALL ORDERS - ADMIN`} />
        <div className='dashboard'>
            <SideBar/>
            <div className='productListContainer'>
                <h1 id='productListHeading'>ALL ORDERS</h1>
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='productListTable'
                autoHeight
                />
            </div>
        </div>
    </Fragment>
  )
}

export default OrdersList