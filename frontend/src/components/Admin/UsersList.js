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
import { getAllUsers,clearError, deleteUser } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';

const UsersList = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,users} = useSelector((state)=>state.allUsers);
    const {isDeleted,error :deleteError,message} = useSelector((state)=>state.profile)

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError()); 
        }
        if(isDeleted){
          alert.success(message);
          history.push("/admin/users");
          dispatch({type:DELETE_USER_RESET});
        }
        if(deleteError){
          alert.error(deleteError);
          dispatch(clearError())
        }
        dispatch(getAllUsers());
    },[dispatch,error,alert,isDeleted,deleteError,message,history])

    const deleteUserHandler = (id) =>{
      dispatch(deleteUser(id));

    };
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "email",
          headerName: "Email",
          minWidth: 210,
          flex: 0.7,
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 150,
          flex: 0.5,
        },
    
        {
          field: "role",
          headerName: "Role",
          minWidth: 90,
          flex: 0.3,
          cellClassName:(params)=>{ 
                return params.getValue(params.id,"role") === "admin"?"greenColor":"yellowColor";
            },
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
                <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteUserHandler(params.getValue(params.id, "id"))
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
      users && 
      users.forEach((item)=>{
        rows.push({
            id:item._id,
            email:item.email,
            name:item.name,
            role:item.role,
        });
      });
  return (
    <Fragment>
        <MetaData title={`ALL USERS - ADMIN`} />
        <div className='dashboard'>
            <SideBar/>
            <div className='productListContainer'>
                <h1 id='productListHeading'>ALL USERS</h1>
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

export default UsersList