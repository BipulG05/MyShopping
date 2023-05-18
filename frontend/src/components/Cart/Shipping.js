import React, { Fragment, useState } from 'react'
import './Shipping.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import MetaData from '../layout/MetaData';
import PinDropIcon from '@material-ui/icons/PinDrop';
import Homeicon from '@material-ui/icons/Home';
import LocationCityicon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public'
import Phoneicon from '@material-ui/icons/Phone'
import TransferWidthinAStationIcon from '@material-ui/icons/TransferWithinAStation'
import {Country,State} from "country-state-city"
import { useAlert } from 'react-alert';
import CheckoutSteps from '../Cart/CheckoutSteps.js'


 
const Shipping = ({history}) => { 
    const dispatch = useDispatch();
    const alert = useAlert();
    const {shippingInfo} = useSelector((state)=>state.cart);
    const [address,setAddress] = useState(shippingInfo.address);
    const [city,setCity] = useState(shippingInfo.city);
    const [state,setState] = useState(shippingInfo.state);
    const [country,setCountry] = useState(shippingInfo.country);
    const [pincode,setPincode] = useState(shippingInfo.pincode);
    const [phoneNo,setPhoneNo] = useState(shippingInfo.phoneNo);


    const shippingSubmit = (e) =>{
        e.preventDefault();
        if(phoneNo.length < 10 || phoneNo.length >10){
            alert.error("Phone number should b 10 digits");
            return;
        }
        dispatch(saveShippingInfo({address,state,city,country,pincode,phoneNo}));
        history.push("/order/confirm");
    }

    




  return (
    <Fragment>
        <MetaData title='Shipping Details'/>
        <CheckoutSteps activeStep={0}/>

        <div className='shippingContainer'>
            <div className='shippingBox'>
                <h2 className='shippingHeading'>Shipping Details</h2>
                <form 
                className='shippingForm'
                encType='multipart/from-data'
                onSubmit={shippingSubmit}>
                    <div>
                        <Homeicon/>
                        <input type='text' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)} />
                    </div>
                    <div>
                        <LocationCityicon/>
                        <input type='text' placeholder='City' value={city} onChange={(e) =>setCity(e.target.value)} required />
                    </div>
                    <div>
                        <PinDropIcon/>
                        <input type='number' placeholder='Pin Code' value={pincode} onChange={(e)=>setPincode(e.target.value)} required />
                    </div>
                    <div>
                        <Phoneicon/>
                        <input type='number' placeholder='Phone Number' value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} size={10} required />
                    </div>
                    <div>
                        <PublicIcon/>
                        <select
                        value={country}
                        onChange={(e)=>setCountry(e.target.value)}
                        required
                        >
                            <option value="">chose country</option>
                            {Country && Country.getAllCountries().map((item)=>(
                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    {country && (
                        <div>
                            <TransferWidthinAStationIcon/>
                            <select
                            value={state}
                            onChange={(e)=>setState(e.target.value)}
                            required
                            >
                                <option value="">chose country</option>
                                {State && State.getStatesOfCountry(country).map((item)=>
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>

                                )}
                            </select>

                        </div>
                    )}
                    <input 
                        type='submit' 
                        value="Continue"
                        className='shippingBtn'
                        disabled={state?false:true}
                    />

                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Shipping