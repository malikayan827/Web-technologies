import React, { Fragment, useEffect,useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./ProductDetails.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearError, getProductDetails } from "../../../actions/productActions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactStars from 'react-rating-stars-component';
import ReviewCard from "./ReviewCard.js";
import Loader from "..//..//layout//loader//Loader.js";
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, navigate]);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
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
  
  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearError())
    }
    dispatch(getProductDetails);
  }, [dispatch,error]);

  return (
    <Fragment>
    {loading ? (<Loader/>):(<Fragment>
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
        <div>
          
          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
              <ReactStars {...options} />
              <span>({product.numOfReviews} Reviews)</span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`Rs  ${product.price}`}</h1>
              <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>-</button>
                <input readOnly type="number" value={quantity} />
                <button>+</button>

                
                </div>{" "}
                <button >Add to Cart</button>

              </div>
              <p>
                Status:{" "}
                <b className={product.Stock < 1? "redColor" :"greenColor"}>
                    {product.Stock > 0 ? "In Stock" : "Out of Stock"}


                </b>
              </p>
            </div>
            <div className="detailsBlock-4">
              Description:<p>{product.description}</p></div>
            <button className="submitReview">Submit Review</button>

          </div>
        </div>
      </div>
      <h3 className="reviewsHeading">
        Reviews 
      </h3>
      {product.reviews && product.reviews[0]?(<div className="reviews">
      {product.reviews.map((review) => <ReviewCard review={review}/>)}
      </div>):(<p className="noReviews">No reviews</p>)}
      
    </Fragment>)}
    </Fragment>
  );
};

export default ProductDetails;
