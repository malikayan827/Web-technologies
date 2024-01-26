import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';

import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import MetaData from "../layout/MetaData";
import LaunchIcon from '@mui/icons-material/Launch';


const MyOrders = () => {
    const dispatch = useDispatch();
   
    
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
    const columns = [
        {field:"id",headerName:"Order ID",minwidth:300,flex:1},
        { field: 'price', headerName: 'Price', minwidth: 150 ,type: 'number',flex:0.3},
        { field: 'quantity', headerName: 'Quantity', minwidth: 150 ,type: 'number',flex:0.5},
        { field: 'status', headerName: 'Status', minwidth: 150 ,flex:0.5},
        { field: 'actions', headerName: 'Actions',type:'number', minwidth: 150, renderCell: (params) => {
            return (
                <Fragment>
                    <Link to={`/order/${params.row.id}`} className="orderDetailsLink">
                        <LaunchIcon/>
                    </Link>
                </Fragment>
            )
        } },
        
    ]
    const rows = []
    orders && orders.map((order,index) => {
        rows.push({
            id:order._id,
            price:order.totalPrice,
            quantity:order.orderItems.length,
            status:order.orderStatus
        })
    })
    useEffect(() => {
        dispatch(myOrders());
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch,toast, error]);
  return <Fragment>
  <metadata title={`${user.name} - Orders`} />
  {loading?(<Loader/>):(
    <div className="myOrdersPage">
    <DataGrid
    rows={rows}
    columns={columns}
    pageSize={10}
    disableSelectionOnClick
    className="myOrdersTable"
    autoHeight/>
    <Typography
    id="myOrdersHeading">
        {user.name}'s Orders
    </Typography>

    </div>
  )

  }
  </Fragment>
}

export default MyOrders