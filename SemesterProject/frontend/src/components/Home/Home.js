import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import ProductCard from "./Product/ProductCard.js";
import product1 from "../../images/product1.jpg";
import { getProduct } from "../../actions/productActions.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loader from "../layout/loader/Loader.js";
import { toast } from 'react-toastify';
import { clearError } from "../../actions/productActions.js";

const Home = () => {
  
  const dispatch = useDispatch();
  const {loading,error,products,productsCount}=useSelector(state=>state.products)
  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearError())
    }
    dispatch(getProduct());
  }, [dispatch,error]);

  return (
   <Fragment>
    {loading ? (<Loader/>
      ):( <Fragment>
      
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>Scroll <CgMouse/></button>
        </a>
      </div>
      <h2 className="homeHeading">FEATURED PRODUCTS</h2>
      <div className="container" id="container">
      {products && products.map(product=>(
        <ProductCard product={product}/>
      ))}
     


      </div>
    </Fragment>)}
   </Fragment>
  );
};

export default Home;
