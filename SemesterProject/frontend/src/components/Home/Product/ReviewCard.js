import React from 'react'
import ReactStars from 'react-rating-stars-component';
import profile from '..//..//..//images/Profile.png'
import { useState } from 'react';
const ReviewCard = ({review}) => {
    const [rating, setRating] = useState(2.5);
    const options = {
        edit: false,
        color: 'rgba(20, 20, 20, 0.1)',
        activeColor: 'rgb(255, 215, 0)',
        size: window.innerWidth < 608 ? 20 : 25,
        value: review.ratings,
        isHalf: true,
        onChange: (newRating) => setRating(newRating),
      };
  return (
    <div className='reviewCard'>
        <img src={profile} alt='user' />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard