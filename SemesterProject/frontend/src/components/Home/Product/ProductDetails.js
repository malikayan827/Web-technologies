import React, { Fragment, useEffect,useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./ProductDetails.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearError, getProductDetails,newReview } from "../../../actions/productActions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactStars from 'react-rating-stars-component';
import ReviewCard from "./ReviewCard.js";
import Loader from "..//..//layout//loader//Loader.js";
import { toast } from 'react-toastify';
import { addItemToCart } from "../../../actions/cartActions.js";
import { Dialog,DialogActions,
DialogContent,
DialogTitle,
Button, 
Rating} from "@mui/material";
import MetaData from "../../layout/MetaData.js";
import { REVIEW_FAIL,REVIEW_REQUEST,REVIEW_SUCCESS,REVIEW_RESET } from "../../../Constants/productConstants.js";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const {id} = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock > quantity) {
      const qty = quantity + 1;
      setQuantity(qty);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const qty = quantity - 1;
      setQuantity(qty);
    }
  };


  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    toast.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId",id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearError());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, toast, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
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
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};


export default ProductDetails;
// const ProductDetails = () => {
  

//   const dispatch = useDispatch();

//   const navigate = useNavigate();
//   const { product, loading, error } = useSelector(
//     (state) => state.productDetails
//   );
//   const { success, error: reviewError } = useSelector(
//     (state) => state.newReview
//   );
//   const { id } = useParams();
//   const [open,setOpen]=useState(false);
//   const [rating1,setRating1]=useState(0);

//   const [comment,setComment]=useState('');
//   const submitReviewToggle=()=>{
//     open?setOpen(false):setOpen(true);
//   }
//   const submitReviewHandler=()=>{
//     const formData=new FormData();
//     formData.set('rating',rating1);
//     formData.set('comment',comment);
//     formData.set('productId',id);
//     console.log('Rating:', rating1);
// console.log('Comment:', comment);
// console.log('Product ID:', id);

//     dispatch(newReview(formData));

//     setOpen(false);
//   }

    
   
 
//   useEffect(() => {
//     dispatch(getProductDetails(id));
//   }, [dispatch, id, navigate]);
 

  
//   const [rating, setRating] = useState(2.5);
//   const options = {
//     edit: false,
//     color: 'rgba(20, 20, 20, 0.1)',
//     activeColor: 'rgb(255, 215, 0)',
//     size: window.innerWidth < 608 ? 20 : 25,
//     value: product.ratings,
//     isHalf: true,
//     onChange: (newRating) => setRating(newRating),
//   };
//   const [quantity, setQuantity] = useState(1);
//   const increaseQuantity = () => {
//     if(product.stock<=quantity) return;
//       const qty=quantity+1;
//       setQuantity(qty);
//     };
  
//     const decreaseQuantity = () => {
//       if (quantity > 1) {
//         const qty=quantity-1;
//         setQuantity(qty);
//       }
//     };
//     const addToCartHandler=()=>{
//       dispatch(addItemToCart(id,quantity));
//       toast.success('Item added to cart');
//       // navigate('/cart')
//     }
  
//   useEffect(() => {
//     if(error){
//       toast.error(error);
//       dispatch(clearError())
//     }
//     if(reviewError){
//       toast.error(reviewError);
//       dispatch(clearError())
//     }
//     if(success){
//       toast.success('Review posted successfully');
//       dispatch({type:'REVIEW_RESET'})
//       dispatch(getProductDetails(id));
//     }
    
//   }, [dispatch,error,toast,id]);

//   return (
//     <Fragment>
//     {loading ? (<Loader/>):(<Fragment>
//       <div className="ProductDetails">
//         <div>
//           <Carousel>
//             {product.images &&
//               product.images.map((item, i) => (
//                 <img
//                   className="CarouselImage"
//                   key={item.url}
//                   src={item.url}
//                   alt={`${i} Slide`}
//                 />
//               ))}
//           </Carousel>
//         </div>
//         <div>
          
//           <div>
//             <div className="detailsBlock-1">
//               <h2>{product.name}</h2>
//               <p>Product # {product._id}</p>
//             </div>
//             <div className="detailsBlock-2">
//               <ReactStars {...options} />
//               <span>({product.numOfReviews} Reviews)</span>
//             </div>
//             <div className="detailsBlock-3">
//               <h1>{`Rs  ${product.price}`}</h1>
//               <div className="detailsBlock-3-1">
//               <div className="detailsBlock-3-1-1">
//                 <button onClick={decreaseQuantity}>-</button>
//                 <input readOnly type="number" value={quantity} />
//                 <button onClick={increaseQuantity}>+</button>

                
//                 </div>{" "}
//                 <button onClick={addToCartHandler}>Add to Cart</button>

//               </div>
//               <p>
//                 Status:{" "}
//                 <b className={product.Stock < 1? "redColor" :"greenColor"}>
//                     {product.Stock > 0 ? "In Stock" : "Out of Stock"}


//                 </b>
//               </p>
//             </div>
//             <div className="detailsBlock-4">
//               Description:<p>{product.description}</p></div>
//             <button className="submitReview" onClick={submitReviewToggle}>Submit Review</button>


//           </div>
//         </div>
//       </div>
//       <h3 className="reviewsHeading">
//         Reviews 
//       </h3>
//       <Dialog  aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
// <DialogTitle>Submit Review</DialogTitle>
// <DialogContent className="submitDialog">
//       <Rating 
//       onChange={(e)=>setRating(e.target.value)}
//       value={rating}
//       size="large"
//       />
//       <textarea
//       className="submitDialogTextArea"
//       cols="30"
//       rows="5"
//       value={comment}
//       onChange={(e)=>setComment(e.target.value)}
//       ></textarea>
//       </DialogContent>
//       <DialogActions>
//       <Button  onClick={submitReviewToggle} color="secondary">Cancel</Button>
//       <Button color="primary" onClick={submitReviewHandler}>Submit</Button>
//       </DialogActions>




//       </Dialog>
//       {product.reviews && product.reviews[0]?(<div className="reviews">
//       {product.reviews.map((review) => <ReviewCard review={review}/>)}
//       </div>):(<p className="noReviews">No reviews</p>)}
      
//     </Fragment>)}
//     </Fragment>
//   );
// };
