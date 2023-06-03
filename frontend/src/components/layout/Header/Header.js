import React from 'react'
import {ReactNavbar} from  "overlay-navbar";
import logo from "../../../images/logo.png";
import {FaSearch,FaCartPlus,FaRegUser} from 'react-icons/fa'

function Header() {
  const options = {
    logo,
    burgerColor:"crimson",
    navColor1:"rgb(189, 146, 146)",
    burgerColorHover:"#900",
    logoWidth:"50%",
    logoHoverColor:"tomato",
    link1Size:"1.2rem",
    link1Color:"#121212",
    link1Padding:"1vmax",
    link1ColorHover:"crimson",
    nav2justifyContent:"flex-end",
    link1Margin:"0",
    link2Margin:"0",
    link3Margin:"0",
    link4Margin:"0",
    nav3justifyContent:"flex-start",
    link1Text:"Home",
    link1Url:"/",
    link1Family:"sans-serif",
    link2Text:"Products",
    link2Url:"/products",
    link3Text:"Categories",
    link3Url:"/categories",
    link4Text:"About",
    link4Url:"/about",
    nav4justifyContent:"flex-start",
    searchIcon:true,
    SearchIconElement:FaSearch,
    searchIconMargin:"0.5vmax",
    searchIconUrl:"/search",
    cartIcon:true,
    CartIconElement:FaCartPlus,
    cartIconMargin:"1vmax",
    cartIconUrl:"/cart",
    profileIcon:true,
    ProfileIconElement:FaRegUser,
    profileIconMargin:"0.5vmax",
    profileIconUrl:"/login",
    searchIconColor:"#121212",
    cartIconColor:"#121212",
    profileIconColor:"#121212",
    searchIconColorHover:"crimson",
    cartIconColorHover:"crimson",
    profileIconColorHover:"crimson", 
  };
  return (
    <ReactNavbar {...options} /> 
  )
}

export default Header