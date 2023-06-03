import {
    ADMIN_CATEGORY_REQUEST,
    ADMIN_CATEGORY_SUCCESS,
    ADMIN_CATEGORY_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_RESET,
    NEW_CATEGORY_FAIL,
    DELTE_CATEGORY_REQUEST,
    DELTE_CATEGORY_SUCCESS,
    DELTE_CATEGORY_RESET,
    DELTE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_RESET,
    UPDATE_CATEGORY_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    CLEAR_ERRORS

} from '../constants/categoryConstants';


//add category reducer (admin)
export const newCategoryReducer =
 (state ={ category:{} },action) => {
    switch(action.type){
        case NEW_CATEGORY_REQUEST:
            return{
                ...state,
                loading:true,
            };
        case NEW_CATEGORY_SUCCESS:
            return{
                loading:false,
                success:action.payload,
                category:action.payload.category,
            };
        case NEW_CATEGORY_FAIL :
            return {
                ...state,
                loading:false,
                error:action.payload,
            };
        case NEW_CATEGORY_RESET :
            return {
                ...state,
                success:false,
            };
        case CLEAR_ERRORS :
            return {
                ...state,
                error:null,
            };
        default:
            return state;
    }
};
//delete category reducer (admin)
export const categoryReducer =
 (state ={ category:{} },action) => {
    switch(action.type){
        case DELTE_CATEGORY_REQUEST:
            case UPDATE_CATEGORY_REQUEST:
                return{
                    ...state,
                    loading:true,
                };
        case DELTE_CATEGORY_SUCCESS:
            return{
                ...state,
                loading:false,
                isDeleted:action.payload,
            };
        case UPDATE_CATEGORY_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload,
            };
        case DELTE_CATEGORY_FAIL :
            case UPDATE_CATEGORY_FAIL:
                return {
                    ...state,
                    loading:false,
                    error:action.payload,
                };
        case DELTE_CATEGORY_RESET :
            return {
                ...state,
                isDeleted:false,
            };
        case UPDATE_CATEGORY_RESET:
            return {
                ...state,
                isUpdated:false,
            };
        case CLEAR_ERRORS :
            return {
                ...state,
                error:null,
            };
        default:
            return state;
    }

};

//get all categories admin and user
export const categoriesReducer =
 (state ={ categories: [] },action) => {
    switch(action.type){
        case ALL_CATEGORY_REQUEST:
            case ADMIN_CATEGORY_REQUEST:
                return{
                    loading:true,
                    categories:[]
                };
        case ALL_CATEGORY_SUCCESS:
            case ADMIN_CATEGORY_SUCCESS:
                return{
                    loading:false,
                    categories:action.payload.categories,
                };
        case ALL_CATEGORY_FAIL :
            case ADMIN_CATEGORY_FAIL:
                return {
                    loading:false,
                    error:action.payload,
                };
        case CLEAR_ERRORS :
            return {
                ...state,
                error:null,
            };
        default:
            return state;
    }

};