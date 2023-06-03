import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productsReducer,productReducer,productDetailsReducer, newReviewReducer, newProductReducer, productReviewsReducer, reviewReducer } from './reducers/productReducer'
// import { useReducer } from 'react';
import { profileReducer,forgotPasswordReducer, userReducer, allUserReducer, userDetailsReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { OrdersDetailsReducer, allOrdersReducer, myOrdersReducer, newOrderReducer, ordersReducer } from './reducers/orderReducer';
import { categoriesReducer, categoryReducer, newCategoryReducer } from './reducers/categoryReducer';


const reducer = combineReducers({ 
    products:productsReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:OrdersDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    product:productReducer,
    allOrders:allOrdersReducer,
    order:ordersReducer,
    allUsers:allUserReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer,
    categories:categoriesReducer,
    category:categoryReducer,
    newCategory:newCategoryReducer,

});

let initialState ={
    cart:{
        cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[], 
        shippingInfo:localStorage.getItem("shiippingInfo") ? JSON.parse(localStorage.getItem("shiippingInfo")):{},
    }
};
const middleware = [thunk];
const store = createStore (
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;
