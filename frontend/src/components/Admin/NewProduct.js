import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, createProduct } from '../../actions/productAction';
import { Button } from '@material-ui/core';
import './NewProduct.css';
import MetaData from '../layout/MetaData';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";


const NewProduct = ({history}) => {
    const categories = [
        "laptop",
        "footware",
        "mobile",
        "camera",
        "phone"
    ];
    const dispatch = useDispatch();
    const alert = useAlert();

    const {loading , error ,success} = useSelector((state)=>state.newProduct)
    
    const [name,setName] = useState('');
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('');
    const [stock,setStock] = useState(0);
    const [images,setImages] = useState([]);
    const [imagesPrevew,setImagesPrevew] = useState([]);

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        if(success){
            alert.success("Product Create Successfully");
            history.push("/admin/dashboard/");
            dispatch({type:NEW_PRODUCT_RESET});
        }

    },[alert,dispatch,error,history,success])

    const createProductSubmitHandle = (e) =>{
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
        // console.log(myForm.get("images"))
        dispatch(createProduct(myForm));

    };
    const createProductImageChange = (e) =>{
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPrevew([]);
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
                onSubmit={createProductSubmitHandle}
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
                        required
                        onChange={(e)=>setPrice(e.target.value)}/>

                    </div>
                    <div>
                        <DescriptionIcon/>
                        <textarea
                        placeholder='Product Description'
                        col="30"
                        rows="5"
                        required
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}>
                        </textarea>
                    </div>
                    <div>
                        <AccountTreeIcon/>
                        <select onChange={(e)=>setCategory(e.target.value)}>
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
                        required
                        onChange={(e)=>setStock(e.target.value)}/>
                    </div>
                    <div id='createProductFromFile'>
                        <input
                        type='file'
                        name="avatar"
                        accept='image/*'
                        onChange={createProductImageChange} 
                        multiple
                        />
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

export default NewProduct