import { DataGrid } from '@material-ui/data-grid';
import React, { Fragment, useEffect } from 'react';
import "./ProductReviews.css"
import { useDispatch, useSelector } from 'react-redux';
import {
    clearError,
    deleteReview,
    getAllReviews,
  } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import Star from '@material-ui/icons/Star';
import { DELETE_REVIEW_RESET} from '../../constants/productConstants';
import { useState } from 'react';

const ProductReviews = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,reviews,loading} = useSelector((state)=>state.productReviews);
    const {isDeleted,error :deleteError} = useSelector((state)=>state.review)
    const [productId,setProductId] = useState('');
    useEffect(()=>{
        if(productId.length === 24){
            dispatch(getAllReviews(productId));
        }
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        if(isDeleted){
          alert.success("Review deleted successfully");
          history.push("/admin/reviews");
          dispatch({type:DELETE_REVIEW_RESET});
        }
        if(deleteError){ 
          alert.error(deleteError);
          dispatch(clearError())
        }
    },[dispatch,productId,error,alert,isDeleted,deleteError,history])

    const deleteProductReviewHandle = (reviewId) =>{
      dispatch(deleteReview(reviewId,productId));

    };
    const productReviewSubmitHandle = (e) =>{
        e.preventDefault();
        alert.info(productId);
        dispatch(getAllReviews(productId));

    }
    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "user",
          headerName: "User",
          minWidth: 150,
          flex: 0.5,
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 270,
            flex: 0.9,
          },
    
        {
          field: "rating",
          headerName: "Rating",
          type: "number",
          minWidth: 150,
          flex: 0.5,
          cellClassName:(params)=>{ 
                return params.getValue(params.id,"rating") >= 3?"greenColor":"redColor";
            },
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 90,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Button
                  onClick={() =>
                    deleteProductReviewHandle(params.getValue(params.id, "id"))
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
      reviews && 
      reviews.forEach((item)=>{
        rows.push({
            id:item._id,
            rating:item.rating,
            comment:item.comment, 
            user:item.name,
        });
      });
  return (
    <Fragment>
        <MetaData title={`ALL REVIEWS - ADMIN`} />
        <div className='dashboard'>
            <SideBar/>
            <div className='productReviewsContainer'>
                <form
                    className='productReviewsForm'
                    onSubmit={productReviewSubmitHandle}
                    >
                        <h1 className='productReviewsFormHeading'>ALL REVIEWS</h1> 
                        <div>
                            <Star/>
                            <input
                            type='text'
                            placeholder='Product Id'
                            className='productId'
                            required
                            value={productId}
                            onChange={(e)=>setProductId(e.target.value)}/>

                        </div>
                        <Button 
                            id='createProductBtn'
                            type='submit'
                            disabled={loading ? true :false || productId === ''?true:false}
                        >Search</Button>
                    </form>
                    {reviews && reviews.length >0 ? (
                        <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                        />
                    ):
                        <h1 className='productReviewsForheading'>No Reviews Found</h1>
                    }
                
            </div>
        </div>
    </Fragment>
  )
}

export default ProductReviews