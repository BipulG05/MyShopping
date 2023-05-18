import React, { Fragment } from 'react';
import './Categories.css'
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CategoriesImage from './CategorisImage';

const Categories = () => {
  // const categoris = [
  //   "gogog0",
  //   "gogog1",
  //   "gogog2",
  //   "gogog3",
  //   "gogog4",
  //   "gogog5",
  //   "gogog6",
  //   "gogog7",
  //   "gogog8",
  //   "gogog9"
  // ]
  return (
    <Fragment>
      <div className='categoriesPage'>
        <Typography component="h2">All Categories</Typography>
        <div className='categoriesContainer'>
          {CategoriesImage && CategoriesImage.map((item,i)=>(
            <Link key={i} to={item.path}>
                <img src={item.url} alt={item.name}/>
                <p>{item.name}</p>
            </Link>
          ))}
        </div>
        <div className='categorySepater'></div>
        <Typography component="h2">More On MyShop </Typography>
        <div className='moreOnShopContainer'>
            {CategoriesImage && CategoriesImage.map((item,i)=>(
              <Link key={i} to={item.path}>
                  <img src={item.url} alt={item.name}/>
                  <p>{item.name}</p>
              </Link>
            ))}
        </div>
        <div className='categorySepater'></div>
        <Typography component="h2">Tranding Store</Typography>
        <div className='trandingStoreContainer'>
            {CategoriesImage && CategoriesImage.map((item,i)=>(
              <Link key={i} to={item.path}>
                  <div className='trandingStoreContainerHeadingBox'>
                    <p>{item.name} &gt; </p>
                    <p>{item.name}</p>
                  </div>
                  <img src={item.url} alt={item.name}/>
              </Link>
            ))}
        </div>
      </div>
    </Fragment>
  )
}

export default Categories