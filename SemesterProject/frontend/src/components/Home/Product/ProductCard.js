import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './product.css';

import ReactStars from 'react-rating-stars-component';

const ProductCard = ({ product }) => {
  const [rating, setRating] = useState(2.5);

  const options = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.1)',
    activeColor: 'rgb(255, 215, 0)',
    size: window.innerWidth < 608 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
    onChange: (newRating) => setRating(newRating),
  };

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} className='productImg' />
      <p>{product.name}</p>
      <div>
        <ReactStars classNames='stars' {...options} />
        <span>({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`Rs${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
