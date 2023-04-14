import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Profile.css'

const Profile = ({history}) => {
    const {user,loading,isAuthenticated} = useSelector((state)=>state.user);
    useEffect(()=>{
        if(isAuthenticated===false){
            history.push("/logout");
        }
    },[history,isAuthenticated])
  return (
    <Fragment>
        <MetaData title={`${user.name}'s Profile`} />
        <div className='profileContainer'>
            <div>
                <h1>My Profile</h1>
                <img src={user.avatar.url} alt={user.name}/>
                <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
                <div>
                    <h4>My Name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Joined On</h4>
                    <p>{String(user.creatAt).substring(0,10)}</p>
                </div>
                <div>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/password/update">Change password</Link>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Profile