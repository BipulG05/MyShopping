import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, updateProduct,getProductDetails } from '../../actions/productAction';
import { Button } from '@material-ui/core';
import './NewProduct.css';
import MetaData from '../layout/MetaData';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
// import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import Joditeditor from 'jodit-react';
import { useRef } from 'react';

const UpdateProduct = ({history,match}) => {
    const categories = [
        "laptop",
        "footware",
        "mobile",
        "camera",
        "phone"
    ];
    const productId = match.params.id;
    const dispatch = useDispatch();
    const alert = useAlert();
    const editor = useRef(null);
    

    const {loading , error:updateEerror ,isUpdated} = useSelector((state)=>state.product)
    const {error,product} = useSelector((state)=>state.productDetails)




    const [name,setName] = useState('');
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('');
    const [stock,setStock] = useState(0);
    const [images,setImages] = useState([]);
    const [oldimages,setOldImages] = useState([]);
    const [imagesPrevew,setImagesPrevew] = useState([]);

    useEffect(()=>{
        if(product && product._id!==productId){
            dispatch(getProductDetails(productId));
        }
        else{
            setName(product.name);
            setDescription(product.description);
            setStock(product.stock);
            setPrice(product.price);
            setCategory(product.category);
            setOldImages(product.images);
        }
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        if(updateEerror){
            alert.error(updateEerror);
            dispatch(clearError());
        }
        if(isUpdated){
            alert.success("Product Updated Successfully");
            history.push("/admin/products/");
            dispatch({type:UPDATE_PRODUCT_RESET});
        }

    },[alert,dispatch,error,history,updateEerror,isUpdated,productId,product])

    const updateProductSubmitHandle = (e) =>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("price",price);
        myForm.set("description",description);
        myForm.set("category",category);
        myForm.set("stock",stock);
        myForm.set("images",JSON.stringify(images));
        // images.forEach((image)=>{
        //     myForm.append("images",image);
        // });
        dispatch(updateProduct(productId,myForm));

    };
    const updateProductImageChange = (e) =>{
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPrevew([]);
        setOldImages([]);
        files.forEach((file)=>{
            const reader = new FileReader();
            
            reader.onload = () =>{
                if(reader.readyState === 2){
                    setImagesPrevew((old)=>[...old,reader.result]);
                    setImages((old)=>[...old,reader.result]);
                }
            }
            reader.readAsDataURL(file);
        })
    };


  return (
    <Fragment>
        <MetaData title="Create Product"/>
        <div className='dashboard'>
            <SideBar/>
            <div className='createProductContainer'>
                <form
                className='createProductForm'
                encType='multipart/from-data'
                onSubmit={updateProductSubmitHandle}
                >
                    <h1>Create Product</h1>
                    <div>
                        <SpellcheckIcon/>
                        <input
                        type='text'
                        placeholder='Product Name'
                        required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}/>

                    </div>
                    <div>
                        <AttachMoneyIcon/>
                        <input
                        type='number'
                        placeholder='Price'
                        value={price}
                        required
                        onChange={(e)=>setPrice(e.target.value)}/>

                    </div>
                    {/* <div>
                        <DescriptionIcon/>
                        <textarea
                        placeholder='Product Description'
                        col="30"
                        rows="5"
                        required
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}>
                        </textarea>
                    </div> */}
                    <div>
                        <Joditeditor ref={editor} value={description} onChange={(content) => setDescription(content)} />
                    </div>
                    <div>
                        <AccountTreeIcon/>
                        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value=''>Choose Category</option>
                            {categories.map((cate)=>(
                                <option key={cate} value={cate}>{cate}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <StorageIcon/>
                        <input
                        type='number'
                        placeholder='Stock'
                        value={stock}
                        required
                        onChange={(e)=>setStock(e.target.value)}/>
                    </div>
                    <div id='createProductFromFile'>
                        <input
                        type='file'
                        name="avatar"
                        accept='image/*'
                        onChange={updateProductImageChange}
                        multiple
                        />
                    </div>
                    <div id='oldProductFromImage'>
                        {oldimages && oldimages.map((image,index) => (
                            <img key={index} src={image.url} alt='old Product Prevew' />
                        ))}
                    </div>
                    <div id='createProductFromImage'>
                        {imagesPrevew.map((image,index) => (
                            <img key={index} src={image} alt='Product Prevew' />
                        ))}
                    </div>
                    <Button 
                    id='createProductBtn'
                    type='submit'
                    disabled={loading ? true :false}
                    >Create</Button>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default UpdateProduct