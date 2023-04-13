import React from 'react'
import playstore from '../../../images/playstore.png';
import appstore from '../../../images/Appstore.png';
import './Footer.css'


function Footer() {
  return (
    <footer id = "footer">
      <div className="leftFooter">
          <h4>Download our App</h4>
          <p>Download app for Android and IOS mobile pphone</p>
          <img src={playstore} alt="playstore" />
          <img src={appstore} alt="appstore" />
      </div>
      <div className="midFooter">
        <h1>MyShop</h1>
        <p>Copyrights 2021 &copy; MyShop.com</p>

      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href='https://MyShop.com'>YouTube</a>
        <a href='https://MyShop.com'>Instagram</a>
        <a href='https://MyShop.com'>Facebook</a>
      </div>
    </footer>
  )
}

export default Footer