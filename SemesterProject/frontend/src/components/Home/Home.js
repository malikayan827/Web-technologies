import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import Product from "./Product/Product.js";
import product1 from "../../images/product1.jpg";

const product={
  id:1,
  name:"Shirt",
  price:1000,
  description:"This is a shirt",
  image:product1
}
const Home = () => {
  return (
    <Fragment>
      
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>Scroll <CgMouse/></button>
        </a>
      </div>
      <h2 className="homeHeading">FEATURED PRODUCTS</h2>
      <div className="container" id="container">
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />


      </div>
    </Fragment>
  );
};

export default Home;
