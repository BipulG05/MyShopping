import React, { Fragment, useEffect,useState } from 'react'
import './ProductDetails.css';
import Carousel from 'react-material-ui-carousel';
import { clearError, getProductDetails, newReview } from '../../actions/productAction'
import { useDispatch,useSelector } from 'react-redux';
// import ReactStars from 'react-rating-stars-component';
import ReviewCard from "./ReviewCard.js";
import Loder from '../layout/Loader/Loder';
import { useAlert } from 'react-alert'; 
import MetaData from '../layout/MetaData';
import {addToCart} from '../../actions/cartAction';
import {Dialog,DialogActions,DialogContent,DialogTitle,Button} from '@material-ui/core'
import { Rating } from '@material-ui/lab';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import Parser from 'html-react-parser';




const ProductDetails = ({match}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {product,loading,error} =useSelector((state)=> state.productDetails);
  const {success,error:reviewError} =useSelector((state)=> state.newReview);
  
  
  const[quantity,setQuentity] = useState(1)

  const[open,setOpen] = useState(false)
  const[rating,setRating] = useState(0)
  const[comment,setComment] = useState('')

  

  const dscquantity = () =>{
    if(quantity>1){ 
      const qty = quantity-1;
      setQuentity(qty);
    }
    else{
      alert.info('Number of items can not be less then one(1)');
    } 
  }
  const incquantity = () =>{
    if(product.stock > quantity){
      if(quantity<10){
        const qty = quantity+1;
        setQuentity(qty);
      }
      else{   
        alert.info('Number of item can not be more then Ten(10)');
      }
    }
    else{
      alert.info(`no of item presnet in stock ${quantity}`);
    }
  }
  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearError());
    }
    if(reviewError){
      alert.error(reviewError);
      dispatch(clearError());
    }
    if(success){
      alert.success("Review Submitted Successfully");
      dispatch({type:NEW_REVIEW_RESET});
    }
    dispatch(getProductDetails(match.params.id))
  },[dispatch,reviewError,success,match.params.id,error,alert])

  const Options = {
      // edit:false,
      // color:"rgba(20,20,20,0.1)",
      // activeColor:"tomato",
      // size:window.innerWidth < 600 ? 20 : 25,
      size:"large",
      value:product.ratings,
      // isHalf:true,
      readOnly:true,
      precision:0.5,
  };

  const addToCartHandler = () =>{
    dispatch(addToCart(match.params.id,quantity));
    alert.success(`Item added to cart successful`);

  }
  const submitReviewToggle = () =>{
    open ? setOpen(false):setOpen(true);
  }
  const reviewSubmitHandler = () =>{
    const myForm = new FormData();
    myForm.set("rating",rating);
    myForm.set("comment",comment);
    myForm.set("productId",match.params.id);
    dispatch(newReview(myForm));
    setOpen(false);
  }


  return (
    <Fragment>
      {loading ? <Loder/>:(
        <Fragment>
          <MetaData title={` ${product.name}... MyShop`}/>
          <div className='ProductDetails'>
            <div>
              <Carousel className='carousl'>
                {product.images && 
                product.images.map((item,i)=>(
                  <img
                  className='CarouselImage'
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                  />
                ))}
              </Carousel>
            </div>
            <div>
              <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className='detailsBlock-2'>
                <Rating  {...Options} /><span className='detailsBlock-2-span'>({product.numofreview} Reviews)</span>
              </div>
              <div className='detailsBlock-3'>
                <h1>{`₹${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                  <div className='detailsBlock-3-1-1'>
                    <button onClick={dscquantity}>-</button>
                      <input value={quantity} type="number"/>
                    <button onClick={incquantity}>+</button>
                  </div>
                      <button hidden={(product.stock <1)? true:false} onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>Status : 
                  <b className={product.stock < 1 ? "redColor":"greenColor"}>
                    {product.stock < 1 ? "OutOfStock": "InStock"}
                  </b>
                </p>
              </div>
              {/* <div classNamee='detailsBlock-4'>
                {product.description && Parser(product.description)}
              </div> */}
              <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
            </div>
          </div>
          <div className='detailsBlock-4'>
                {product.description && Parser(product.description)}
          </div>
          <h3 className='reviewsHeading'>REVIEWS</h3>
          <Dialog 
          aria-labelledby='simple-dialog-title'
          open={open}
          
          > 
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitDialog'>
              <Rating
              onChange={(e)=>setRating(e.target.value)}
              value = {rating}
              size="large"
              />
              <textarea
              className='submitDialogTextArea'
              cols="30"
              rows="5"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={reviewSubmitHandler} color='primary'>Submit</Button>
              <Button variant="outlined" onClick={submitReviewToggle} color='secondary'>Cancel</Button>
            </DialogActions>
          </Dialog>

          

          {product.reviews && product.reviews[0] ? (
            <div className='reviews'>{
              product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} /> )}
            </div>
          ) :(
            <p className='noReviews'>No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductDetails