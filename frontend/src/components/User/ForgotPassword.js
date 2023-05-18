import React, { Fragment,useState,useEffect } from 'react';
import './ForgotPassword.css';
import Loder from '../layout/Loader/Loder';
import { useDispatch, useSelector } from 'react-redux';
import { clearError,forgotPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import MailOutlineIcon from '@material-ui/icons/MailOutline';


const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,message,loading} = useSelector((state) => state.forgotPassword);
    const [email,setEmail] = useState('');

    const ForgotPasswordSubmit = (e) =>{
        e.preventDefault();
        const myform = new FormData();
        myform.set("email",email);
        dispatch(forgotPassword(myform));

    }
    useEffect (()=>{
        
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        
        if(message){
            alert.success(message);
        }
    },[alert,error,dispatch,message])


  return (
    <Fragment>
        {loading?<Loder/>:
        <Fragment>
            <MetaData title='Forgot Password' />
            <div className='ForgotPasswordContainer'>
                <div className='ForgotPasswordBox'>
                <h2 className="ForgotPasswordHeading">Forgot Password</h2>
                    <form className='ForgotPasswordForm'  onSubmit={ForgotPasswordSubmit} >
                        <div className='ForgotPasswordEmail' >
                            <MailOutlineIcon />
                            <input type="email" placeholder='Email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                        </div>
                        <input type='submit' value='Send' className='ForgotPasswordButton'  />
                    </form>
                </div>
            </div>
        </Fragment>
        }
    </Fragment> 
  )
}

export default ForgotPassword
