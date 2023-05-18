import React, { Fragment,useState,useEffect } from 'react';
import './UpdatePassword.css';
import Loder from '../layout/Loader/Loder';
import { useDispatch, useSelector } from 'react-redux';
import { clearError,updatePassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';





const UpdatePassword = ({history}) => { 
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,isUpdated,loading} = useSelector((state) => state.profile);

    const [oldPassword,setOldPassword] = useState(''); 
    const [newPassword,setNewPassword] = useState(''); 
    const [confirmPassword,setConfirmPassword] = useState('');

    
    const updatePasswordSubmit = (e) =>{
            e.preventDefault();
            const myform = new FormData();
            myform.set("oldPassword",oldPassword);
            myform.set("newPassword",newPassword); 
            myform.set("confirmPassword",confirmPassword);
            dispatch(updatePassword(myform));

        }
        
        useEffect (()=>{
            if(error){
                alert.error(error);
                dispatch(clearError());
            }
            
            if(isUpdated){
                alert.success("Password Changed Sucessfully");
                history.push("/account");
                dispatch({
                    type:UPDATE_PASSWORD_RESET,
                });
               
            }
        },[alert,error,dispatch,history,isUpdated])
  return (
    <Fragment>
    {loading?<Loder/>:
    <Fragment>
            <MetaData title='Change Password' />
            <div className='updatePasswordContainer'>
                <div className='updatePasswordBox'>
                <h2 className="updatePasswordHeading">Change Password</h2>
                    <form className='updatePasswordForm'  encType='multipart/from-data' onSubmit={updatePasswordSubmit} >
                        <div className='loginPassword'>
                            <VpnKeyIcon/>
                            <input type="password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} placeholder='Old Password' required/>
                        </div>
                        <div className='loginPassword'>
                            <LockOpenIcon/>
                            <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder='New Password' required/>
                        </div>
                        <div className='loginPassword'>
                            <LockIcon/>
                            <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password' required/>
                        </div>
                        <input type='submit' value='Change Password' className='updatePasswordButton'  />
                    </form>
                </div>
            </div>
        </Fragment>
        }
    </Fragment>
  )
}

export default UpdatePassword