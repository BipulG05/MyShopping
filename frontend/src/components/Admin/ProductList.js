import { DataGrid } from '@material-ui/data-grid';
import React, { Fragment, useEffect } from 'react';
import "./ProductList.css"
import { useDispatch, useSelector } from 'react-redux';
import {
    clearError,
    deleteProduct,
    getAdminProduct,
  } from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELTE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,products} = useSelector((state)=>state.products);
    const {isDeleted,error :deleteError} = useSelector((state)=>state.product)

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        if(isDeleted){
          alert.success("Product deleted successfully");
          history.push("/admin/products");
          dispatch({type:DELTE_PRODUCT_RESET});
        }
        if(deleteError){
          alert.error(deleteError);
          dispatch(clearError())
        }
        dispatch(getAdminProduct());
    },[dispatch,error,alert,isDeleted,deleteError,history])

    const deleteProductHandler = (id) =>{
      dispatch(deleteProduct(id));

    };
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 210,
          flex: 0.7,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 90,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 150,
          flex: 0.5,
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
                <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteProductHandler(params.getValue(params.id, "id"))
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
      products && 
      products.forEach((item)=>{
        rows.push({
            id:item._id,
            stock:item.stock,
            price:item.price,
            name:item.name,
        });
      });
  return (
    <Fragment>
        <MetaData title={`ALL PRODUCTS - ADMIN`} />
        <div className='dashboard'>
            <SideBar/>
            <div className='productListContainer'>
                <h1 id='productListHeading'>ALL PRODUCTS</h1>
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

export default ProductList