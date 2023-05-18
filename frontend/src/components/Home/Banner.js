import React, { Fragment } from 'react';
import Carousel from 'react-material-ui-carousel';
import Bannerimages from './BannerImages';
import './Banner.css';
import {CgMouse} from 'react-icons/cg';


const Banner = () => {
  return (
    <Fragment>
        <div className='banner-s'>
            <div className='product'>
                <p>Welcome to Myshop</p> 
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href='#container' className='mouse'>
                    <button>
                        Scroll <CgMouse/>  
                    </button> 
                </a>
            </div>
            </div>
        <div>
            <Carousel className='carousl1'>
                {Bannerimages && 
                 Bannerimages.map((item,i)=>(
                    <img
                    className='CarouselImage1'
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                    />
                ))}
            </Carousel>
        </div>
    </Fragment>
  )
}

export default Banner