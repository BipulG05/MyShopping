import { SAVE_SHIPPING_INFO,ADD_TO_CART,ADD_TO_CART_FAIL,REMOVE_CART_ITEM } from "../constants/cartConstants";
import axios from 'axios';



// add itm in cart
export const addToCart = (id,quantity) => async (dispatch,getState) =>{
    try{
        const {data} = await axios.get(`/api/v1/product/${id}`);
        // console.log("product data",data)
        dispatch({type:ADD_TO_CART,
            payload:{ 
                    product:data.product._id,
                    name:data.product.name,
                    price:data.product.price,
                    image:data.product.images[0].url,
                    stock:data.product.stock,
                    quantity

                }

        });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
        
    }
    catch(error){
        dispatch({type:ADD_TO_CART_FAIL,payload:error.response.data.message});
    }
}

//remove from cart
export const removeFormCart = (id) => async (dispatch,getState) =>{
    dispatch({
        type:REMOVE_CART_ITEM,
        payload:id,
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));

}

//SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) =>{
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,
    })
    localStorage.setItem("shippingInfo",JSON.stringify(data));

}