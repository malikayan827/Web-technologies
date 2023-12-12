import React, { Fragment, useEffect } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import {  getProduct } from '../../actions/productActions';
import { clearError } from '../../actions/productActions';
import Loader from '../layout/loader/Loader';
import ProductCard from '../Home/Product/ProductCard';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProduct()); // Assuming you have a 'getProducts' action creator
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className='productsHeading'>Products</h2>
          <div className="products">
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
