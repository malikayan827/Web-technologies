import React, { Fragment } from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Stepper, Step, StepLabel, Typography } from '@mui/material';
import './CheckoutSteps.css'
const CheckoutSteps = ({activeStep}) => {

  const steps=[
    {
      label:<Typography>Shipping Details</Typography>,
      icon:<LocalShippingIcon/>

    },
    {
      label:<Typography>Confirm Order</Typography>,
      icon:<LibraryAddCheckIcon/>

    },
    {
      label:<Typography>Payment</Typography>,
      icon:<AccountBalanceIcon/>

    },
  ]
  const stepStyles={
    boxSizing:'border-box',
    marginTop:'2rem',
  }
  return (
    <Fragment>
      <Stepper activeStep={activeStep} alternativeLabel style={stepStyles}>
        {steps.map((step,index)=>(
          <Step key={index} active={activeStep===index ? true:false}>
            <StepLabel style={{
              color:activeStep>=index ? '#ff9f1a':'#000'
            
            }} icon={step.icon}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps