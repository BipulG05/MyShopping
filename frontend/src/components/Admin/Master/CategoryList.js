import { DataGrid } from '@material-ui/data-grid';
import React, { Fragment, useEffect } from 'react';
import "./MasterList.css"
import { useDispatch, useSelector } from 'react-redux';
import {
    clearError,
    getAdminCategory,
    deleteCategory
    
  } from "../../../actions/categoryAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Sidebar";
import { DELTE_CATEGORY_RESET } from '../../../constants/categoryConstants';

const CategoryList = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,categories} = useSelector((state)=>state.categories);
    const {isDeleted,error :deleteError} = useSelector((state)=>state.category)

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        if(isDeleted){
          alert.success("Category deleted successfully");
          history.push("/admin/categories");
          dispatch({type:DELTE_CATEGORY_RESET});
        }
        if(deleteError){
          alert.error(deleteError);
          dispatch(clearError())
        }
        dispatch(getAdminCategory());
    },[dispatch,error,alert,isDeleted,deleteError,history])

    const deleteCategoryHandler = (id) =>{
      dispatch(deleteCategory(id));

    };
    const columns = [
        { field: "id", headerName: "Category ID", minWidth: 150, flex: 0.5 },
    
        { 
          field: "name",
          headerName: "Name",
          minWidth: 180,
          flex: 0.6,
        },
        {
          field: "noOfSubCategory",
          headerName: "No Of SubCategory",
          type: "number",
          minWidth: 120,
          flex: 0.4,
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
                <Link to={`/admin/category/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteCategoryHandler(params.getValue(params.id, "id"))
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
      categories && 
      categories.forEach((item)=>{
        rows.push({
            id:item._id,
            noOfSubCategory:item.subCategory.length,
            name:item.name,
        });
      });
  return (
    <Fragment>
        <MetaData title={`ALL CATEGORY - ADMIN`} />
        <div className='dashboard'>
            <SideBar/>
            <div className='masterListContainer'>
                <h1 id='masterListHeading'>ALL CATEGORY</h1>
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='masterListTable'
                autoHeight
                />
            </div>
        </div>
    </Fragment>
  )
}


export default CategoryList