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
        {field:"id",headerName:"Order ID",minWidth:300,flex:1},
        { field: 'id', headerName: 'ID', width: 300 },

        { field: 'price', headerName: 'Price', width: 150 ,type: 'number'},
        { field: 'quantity', headerName: 'Quantity', width: 150 ,type: 'number'},
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => {
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
    <div className="myOrderPage">
    <DataGrid
    rows={rows}
    columns={columns}
    pageSize={10}
    disableSelectionOnClick
    className="myOrdersTable"
    autoHeight/>
    <Typography
    id="myOrderHeading">
        {user.name}'s Orders
    </Typography>

    </div>
  )

  }
  </Fragment>
}

export default MyOrders