import React, { Fragment, useEffect,useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./ProductDetails.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductDetails } from "../../../actions/productActions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactStars from 'react-rating-stars-component';

const ProductDetails = () => {
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

  return (
    <Fragment>
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
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
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
              <h1>{`Rs $ {product.price}`}</h1>
              <div className="detailsBlock-3.1">
              <div className="detailsBlock-3.1.1">
                <button>-</button>
                <input type="number" value="1" />
                <button>+</button>

                
                </div>{" "}
                <button>Add to Cart</button>

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
    </Fragment>
  );
};

export default ProductDetails;
