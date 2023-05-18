import React, { Fragment,useState,useEffect } from 'react';
import './UpdateProfile.css';
import Loder from '../layout/Loader/Loder';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { clearError,updateProfile, loadUser } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';

const UpdateProfile = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {user} = useSelector((state) => state.user);
    const {error,isUpdated,loading} = useSelector((state) => state.profile);

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [avatar,setAvatar] = useState('');
    const [avatarPreview,setavatarPreview] = useState("/Profile.png")

    const updateProfileSubmit = (e) =>{
            e.preventDefault();
            const myform = new FormData();
            myform.set("name",name);
            myform.set("email",email);
            myform.set("avatar",avatar);
            dispatch(updateProfile(myform));

        }
    const updateProfileDataChange = (e) => {
            const reader = new FileReader();
            reader.onload = () =>{
                // console.log(reader.readyState);
                if(reader.readyState === 2){
                    setavatarPreview(reader.result); 
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } 
        
        useEffect (()=>{
            if(user){
                setName(user.name);
                setEmail(user.email);
                setavatarPreview(user.avatar.url);
            }
            if(error){
                alert.error(error);
                dispatch(clearError());
            }
            
            if(isUpdated){
                // console.log("here");
                alert.success("Profile Updated Sucessfully");
                dispatch(loadUser());
                history.push("/account");
                dispatch({
                    type:UPDATE_PROFILE_RESET,
                });
               
            }
        },[alert,error,dispatch,history,user,isUpdated])

  return (
    <Fragment>
        {loading?<Loder/>:
        <Fragment>
            <MetaData title='Update Profile' />
            <div className='UpdateProfileContainer'>
                <div className='UpdateProfileBox'>
                <h2 className="UpdateProfileHeading">Update Profile</h2>
                    <form className='UpdateProfileForm'  encType='multipart/from-data' onSubmit={updateProfileSubmit} >
                        <div className="UpdateProfileName">
                            <FaceIcon/>
                            <input type="text" placeholder='Name' name='name' value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                        </div>
                        <div className='UpdateProfileEmail' >
                            <MailOutlineIcon />
                            <input type="email" placeholder='Email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                        </div>
                        <div id="UpdateProfileImage">
                            <img src={avatarPreview} alt='Avatar Preview' />
                            <input type='file' name='avatar' accept='image/*' onChange={updateProfileDataChange}/>
                        </div>
                        {/* disabled={loading ? true:false} */}
                        <input type='submit' value='Update Profile' className='UpdateProfileButton'  />
                    </form>
                </div>
            </div>
        </Fragment>
        }
    </Fragment> 
        
  )
}

export default UpdateProfile