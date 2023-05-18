import React, { Fragment,useState,useEffect } from 'react';
import './ResetPassword.css';
import Loder from '../layout/Loader/Loder';
import { useDispatch, useSelector } from 'react-redux';
import { clearError,resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';


const ResetPassword = ({history,match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,success,loading} = useSelector((state) => state.forgotPassword);

    const [password,setpassword] = useState(''); 
    const [confirmPassword,setConfirmPassword] = useState('');

    
    const resetPasswordSubmit = (e) =>{
            e.preventDefault();
            const myform = new FormData();
            myform.set("password",password); 
            myform.set("confirmPassword",confirmPassword);
            // console.log('111111111',myform.get('password')) 
            dispatch(resetPassword(match.params.token,myform));

        }
        
    useEffect (()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        if(success){
            alert.success("Password Update Sucessfully");
            history.push("/login");
        }
    },[alert,error,dispatch,history,success])
  return (
    <Fragment>
    {loading?<Loder/>:
    <Fragment>
            <MetaData title='Change Password' />
            <div className='resetPasswordContainer'>
                <div className='resetPasswordBox'>
                <h2 className="resetPasswordHeading">Change Password</h2>
                    <form className='resetPasswordForm'  onSubmit={resetPasswordSubmit} >
                        
                        <div className='loginPassword'>
                            <LockOpenIcon/>
                            <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='New Password' required/>
                        </div>
                        <div className='loginPassword'>
                            <LockIcon/>
                            <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password' required/>
                        </div>
                        <input type='submit' value='Update' className='resetPasswordButton'  />
                    </form>
                </div>
            </div>
        </Fragment>
        }
    </Fragment>
  )
}

export default ResetPassword