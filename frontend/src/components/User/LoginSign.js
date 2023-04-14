import React, { Fragment,useRef,useState,useEffect } from 'react';
import './LoginSign.css';
import Loder from '../layout/Loader/Loder';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import FaceIcon from '@material-ui/icons/Face'
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login,register } from '../../actions/userAction';
import { useAlert } from 'react-alert';

const LoginSign = ({history}) => {
    const dispath = useDispatch();
    const alert = useAlert()
    const {error,loading,isAuthenticated} = useSelector((state) => state.user)

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switchTab = useRef(null);

    const[loginEmail,setLoginmail] = useState("");
    const[loginPassword,setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;
    const [avatar,setAvatar] = useState();
    const [avatarPreview,setavatarPreview] = useState("/Profile.png")

    const loginSubmit = (e) =>{
        e.preventDefault();
        dispath(login(loginEmail,loginPassword));
    }
    const registerSubmit = (e) =>{
        e.preventDefault();
        const myform = new FormData();
        myform.set("name",name);
        myform.set("email",email);
        myform.set("password",password);
        myform.set("avatar",avatar);
        dispath(register(myform));

    }
    const registerDataChange = (e) => {
        if(e.target.name === 'avatar'){
            const reader = new FileReader();
            reader.onload = () =>{
                // console.log(reader.readyState);
                if(reader.readyState === 2){
                    setavatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({...user,[e.target.name]:e.target.value});
        } 
    }
    useEffect ((error)=>{
        if(error){
            alert.error(error);
            dispath(clearError());
        }
        if(isAuthenticated){
            // console.log("here");
            history.push("/account")
        }
    },[alert,dispath,isAuthenticated,history])
    const switchTabs = (e,tab) => {
        if(tab ==="Login"){
            switchTab.current.classList.add("shiftToNeutral");
            switchTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab==="Register"){
            switchTab.current.classList.add("shiftToRight");
            switchTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");

        }
    };





  return (
    <Fragment>
        {loading ? <Loder/>:
        <Fragment>
            <div className='LoginSignContainer'>
                <div className='LoginSignBox'>
                    <div>
                        <div className='LoginSignToogle' >
                            <p onClick={(e) => switchTabs(e,"Login")}>Login</p>
                            <p onClick={(e) => switchTabs(e,"Register")}>Register</p>
                        </div>
                        <button ref={switchTab}></button>
                    </div>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className='loginEmail'>
                            <MailOutlineIcon />
                            <input type="email" placeholder='Email' value={loginEmail} onChange={(e)=>setLoginmail(e.target.value)} required/>
                        </div>
                        <div className='loginPassword'>
                            <LockOpenIcon/>
                            <input type="password" value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} placeholder='Password' required/>
                        </div>
                        <Link to="/password/forgot">Forget Password ?</Link>
                        <input type='submit' value='Login' className='loginButton' />
                    </form>
                    <form className='signForm' ref={registerTab} encType='multipart/from-data' onSubmit={registerSubmit} >
                        <div className="signName">
                            <FaceIcon/>
                            <input type="text" placeholder='Name' name='name' value={name} onChange={registerDataChange} required/>
                        </div>
                        <div className='signEmail' >
                            <MailOutlineIcon />
                            <input type="email" placeholder='Email' name='email' value={email} onChange={registerDataChange} required/>
                        </div>
                        <div className='signPassword'>
                            <LockOpenIcon/>
                            <input type="password" name='password' value={password} onChange={registerDataChange} placeholder='Password' required/>
                        </div>
                        <div id="registerImage">
                            <img src={avatarPreview} alt='Avatar Preview' />
                            <input type='file' name='avatar' accept='image/*' onChange={registerDataChange}/>
                        </div>
                        {/* disabled={loading ? true:false} */}
                        <input type='submit' value='Register' className='signButton'  />
                    </form>
                </div>
            </div>
        </Fragment>
        }
    </Fragment>
  )
}

export default LoginSign