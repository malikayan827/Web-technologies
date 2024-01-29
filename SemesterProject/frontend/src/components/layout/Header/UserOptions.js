import React, { Fragment } from 'react'
import './useroptions.css'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useState,useEffect } from 'react'
import profile from '..//..//..//images//Profile.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {dispatch,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import { logout } from '../../../actions/userAction'; 
import { toast } from 'react-toastify';
const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const optionsAdmin = [
      { icon: <DashboardIcon />, name: 'Dashboard', func: dashboard },
      { icon: <PersonIcon />, name: 'Profile', func: account },
      { icon: <ExitToAppIcon />, name: 'Logout', func: Logout }
    ];
    
    const options = [
      { icon: <PersonIcon />, name: 'Profile', func: account },
      { icon: <ListAltIcon />, name: 'Orders', func: orders },
      { icon: <ExitToAppIcon />, name: 'Logout', func: Logout }
    ];
   
    // if(user.role==='admin'){
    //     options.unshift({icon:<DashboardIcon/>,name:'Dashboard',
    //   func:dashboard})
    // }
    function dashboard(){
       navigate('/admin/dashboard')
    }
    function orders(){
        navigate('/orders')
    }
    function Logout() {
        // Actual logout logic when the "Logout" button is clicked
        dispatch(logout());
        toast.success('Logged out successfully');
        
        
      }
    function account(){
        navigate('/account')
    }
  return (
    <Fragment>
    <SpeedDial
    className='speedDial'
       ariaLabel="SpeedDial basic example"
       onClose={()=>setOpen(false)}
         onOpen={()=>setOpen(true)}
            open={open}
            direction='down'
            icon={
                <img
                className='speedDialIcon'
                src={user.image.url ?user.image.url: profile}
                alt='profile'/>

            }
      > 
        {/* {options.map((item)=>(
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))} */}
        {user.role === 'admin' ? (
          optionsAdmin.map((item) => (
        <SpeedDialAction
          key={item.name}
          icon={item.icon}
          tooltipTitle={item.name}
          onClick={item.func}
          tooltipOpen={window.innerWidth <= 600 ? true : false}
        />
      ))
    ) : (
      options.map((item) => (
        <SpeedDialAction
          key={item.name}
          icon={item.icon}
          tooltipTitle={item.name}
          onClick={item.func}
          tooltipOpen={window.innerWidth <= 600 ? true : false}
        />
      ))
    )}


        
    </SpeedDial>

    </Fragment>
  )
}

export default UserOptions