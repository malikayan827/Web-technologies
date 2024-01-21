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
import HomeIcon from '@mui/icons-material/Home';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PublicIcon from '@mui/icons-material/Public';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CheckoutSteps from '../Cart/CheckoutSteps.js'
import './shippinginfo.css'
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
    const shippingSubmit=(e)=>{
      e.preventDefault();
      if(phoneNo.length<11 || phoneNo.length>11){
        toast.error('Phone No should be 10 digits long');
        return;
      }
      dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}));
      navigate('/order/confirm')
    }



  return (
   
   <Fragment>
    <MetaData title='Shipping Details'/>
    <CheckoutSteps activeStep={0}/>
   <div className='shippingContainer'>
    <div className='shippingBox'>
      <h2 className='shippingHeading'>Shipping Info</h2>
      <form className='shippingForm'
      encType='multipart/form-data'
      onSubmit={shippingSubmit}
      >
        <div>
          <HomeIcon/>
          <input
          type='text'
          name='address'
          placeholder='Address'
          required
          value={address}
          onChange={(e)=>setAddress(e.target.value)}/>

        </div>
        <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
        <div>
          <PinDropIcon/>
          <input
          type='number'
          name='pinCode'
          placeholder='Pin Code'
          required
          value={pinCode}
          onChange={(e)=>setPinCode(e.target.value)}/>
          </div>
        <div>
        <PhoneIcon/>
          
        <input
          type='number'
          name='phoneNo'
          placeholder='Phone No'
          required
          value={phoneNo}
          onChange={(e)=>setPhoneNo(e.target.value)}/>

        </div>
        <div>
        <PublicIcon/>
        <select
        required
        name='country'
        value={country}
        onChange={(e)=>setCountry(e.target.value)}
        ><option value=''> Country</option>
          {Country.getAllCountries().map((country)=>(
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
          </select>
        </div>
        {country && (
          <div>
          <TransferWithinAStationIcon/>
          <select
          required
          name='state'
          value={state}
          onChange={(e)=>setState(e.target.value)}
          ><option value=''> State</option>
            {State && State.getStatesOfCountry(country).map((state)=>(
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
            </select>
          </div>)}
          <input
          type='submit'
          value='Continue'
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