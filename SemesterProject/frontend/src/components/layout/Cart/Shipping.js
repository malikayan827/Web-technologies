import React from 'react'
import { Fragment,useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MetaData from '../MetaData'
import Loader from '../../layout/loader/Loader'
import { saveShippingInfo } from '../../../actions/cartActions'
import {Country,State} from "country-state-city";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const Shipping = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {shippingInfo} =useSelector((state)=>state.cart);
    const [address,setAddress]=useState(shippingInfo.address);
    const [city,setCity]=useState(shippingInfo.city);
    const [state,setState]=useState(shippingInfo.state);
    
    const [country,setCountry]=useState(shippingInfo.country);
    const [pinCode,setPinCode]=useState(shippingInfo.pinCode);
    const [phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo);


  return (
   <Fragment>
   <div className='shiipingContainer'>
    <div className='shippingBox'>
      <h2 className='shippingHeading'>Shipping Info</h2>
      <form className='shippingForm'
      encType='multipart/form-data'
      ></form>

    </div>
   </div>

   </Fragment>
  )
}

export default Shipping