import axios from 'axios';
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELTE_PRODUCT_REQUEST,
    DELTE_PRODUCT_SUCCESS,
    DELTE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'

//get all product 
export const getProduct = (keyword="",currentPage=1,price=[0,250000],category,ratings=0) => async (dispatch) => {
    try{ 
        dispatch({type:ALL_PRODUCT_REQUEST})
        let link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`;
        }
        const {data} = await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    }catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message,
        });
    }
};
//get product details
export const getProductDetails = (id) => async (dispatch) => {
    try{ 
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/v1/product/${id}`);
        // console.log("print store data",data)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        })
    }
    catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message,
        })
    }
}

// get all product for (admin)
export const getAdminProduct = () => async (dispatch) =>{
    try{
        dispatch({type:ADMIN_PRODUCT_REQUEST});
        const { data } = await axios.get("/api/v1/admin/products");
        dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data.products,
        });
    }
    catch(error){
        dispatch({
            type:ADMIN_PRODUCT_FAIL,
            payload:error.response.data.message,
        });
    }
};

//create Product (admin)
export const createProduct = (productData) => async (dispatch) => {
    try{ 
        dispatch({type:NEW_PRODUCT_REQUEST})
        const config = {
            headers:{"Content-Type":"application/json"},
        }
        const {data} = await axios.post(`/api/v1/admin/product/new`,productData,config);
        dispatch({
            type:NEW_PRODUCT_SUCCESS,
            payload:data,
        })
    }
    catch(error){
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:error.response.data.message,
        })
    }
}

//delete Product (admin)
export const deleteProduct = (id) => async (dispatch) => {
    try{ 
        dispatch({type:DELTE_PRODUCT_REQUEST})
        
        const {data} = await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch({
            type:DELTE_PRODUCT_SUCCESS,
            payload:data.success,
        })
    }
    catch(error){
        dispatch({
            type:DELTE_PRODUCT_FAIL,
            payload:error.response.data.message,
        })
    }
}

//Update Product (admin)
export const updateProduct = (id,productData) => async (dispatch) => {
    try{ 
        dispatch({type:UPDATE_PRODUCT_REQUEST})
        const config = {
            headers:{"Content-Type":"application/json"},
        }
        const {data} = await axios.put(`/api/v1/admin/product/${id}`,productData,config);
        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:data.success,
        })
    }
    catch(error){
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:error.response.data.message,
        })
    }
}

//new Review
export const newReview = (reviewData) => async (dispatch) => {
    try{ 
        dispatch({type:NEW_REVIEW_REQUEST})
        const config = {
            headers:{"Content-Type":"application/json"},
        }
        const {data} = await axios.put(`/api/v1/review`,reviewData,config);
        // console.log("print store data",data)
        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success,
        })
    }
    catch(error){
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message,
        })
    }
}

//Get all reviews of a product (admin)
export const getAllReviews = (id) => async (dispatch) => {
    try{ 
        dispatch({type:ALL_REVIEW_REQUEST})
        // console.log(id);
        const {data} = await axios.get(`/api/v1/reviews?id=${id}`);
        // console.log("print store data",data)
        dispatch({
            type:ALL_REVIEW_SUCCESS,
            payload:data.reviews,
        })
    }
    catch(error){
        dispatch({
            type:ALL_REVIEW_FAIL,
            payload:error.response.data.message,
        })
    }
}

//delete reviews of a product (admin)
export const deleteReview = (reviewId,productId) => async (dispatch) => {
    try{ 
        dispatch({type:DELETE_REVIEW_REQUEST})
        console.log(reviewId,"..............",productId)
        const {data} = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
        // console.log("print store data",data)
        dispatch({
            type:DELETE_REVIEW_SUCCESS,
            payload:data.success, 
        })
    }
    catch(error){
        dispatch({
            type:DELETE_REVIEW_FAIL,
            payload:error.response.data.message,
        })
    }
}















//clearing error
export const clearError = () => async (dispatch) => {
    dispatch({type:CLEAR_ERRORS})
}