import axios from 'axios';
import {
    ADMIN_CATEGORY_REQUEST,
    ADMIN_CATEGORY_SUCCESS,
    ADMIN_CATEGORY_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    DELTE_CATEGORY_REQUEST,
    DELTE_CATEGORY_SUCCESS,
    DELTE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    CLEAR_ERRORS

} from '../constants/categoryConstants';


//get all category 
export const getCategory = (keyword="") => async (dispatch) => {
    try{ 
        dispatch({type:ALL_CATEGORY_REQUEST})
        let link =`/api/v1/categories?keyword=${keyword}`;
        
        const {data} = await axios.get(link);
        dispatch({
            type:ALL_CATEGORY_SUCCESS,
            payload:data,
        })
    }catch(error){
        dispatch({
            type:ALL_CATEGORY_FAIL,
            payload:error.response.data.message,
        });
    }
};

// get all Category for (admin)
export const getAdminCategory = () => async (dispatch) =>{
    try{
        dispatch({type:ADMIN_CATEGORY_REQUEST});
        const { data } = await axios.get("/api/v1/admin/categoris");
        dispatch({
            type:ADMIN_CATEGORY_SUCCESS,
            payload:data,
        });
    }
    catch(error){
        dispatch({
            type:ADMIN_CATEGORY_FAIL,
            payload:error.response.data.message,
        });
    }
};

//create Category (admin)
export const createCategory = (categoryData) => async (dispatch) => {
    try{ 
        dispatch({type:NEW_CATEGORY_REQUEST})
        const config = {
            headers:{"Content-Type":"application/json"},
        }
        const {data} = await axios.post(`/api/v1/admin/category/new`,categoryData,config);
        dispatch({
            type:NEW_CATEGORY_SUCCESS,
            payload:data,
        })
    }
    catch(error){
        dispatch({
            type:NEW_CATEGORY_FAIL,
            payload:error.response.data.message,
        })
    }
}
//delete Category (admin)
export const deleteCategory = (id) => async (dispatch) => {
    try{ 
        dispatch({type:DELTE_CATEGORY_REQUEST})
        
        const {data} = await axios.delete(`/api/v1/admin/category/${id}`);
        dispatch({
            type:DELTE_CATEGORY_SUCCESS,
            payload:data.success,
        })
    }
    catch(error){
        dispatch({
            type:DELTE_CATEGORY_FAIL,
            payload:error.response.data.message,
        })
    }
}

//Update Category (admin)
export const updateCategory = (id,categoryData) => async (dispatch) => {
    try{ 
        dispatch({type:UPDATE_CATEGORY_REQUEST})
        const config = {
            headers:{"Content-Type":"application/json"},
        }
        const {data} = await axios.put(`/api/v1/admin/category/${id}`,categoryData,config);
        dispatch({
            type:UPDATE_CATEGORY_SUCCESS,
            payload:data.success,
        })
    }
    catch(error){
        dispatch({
            type:UPDATE_CATEGORY_FAIL,
            payload:error.response.data.message,
        })
    }
}










//clearing error
export const clearError = () => async (dispatch) => {
    dispatch({type:CLEAR_ERRORS})
}