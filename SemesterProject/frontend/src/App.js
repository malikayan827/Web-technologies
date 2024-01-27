import "./App.css";
import Header from "./components/layout/Header/Header";
// Import Bootstrap CSS in your index.js or App.js file
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webfont from "webfontloader";
import React from "react";
import Footer from "./components/layout/Footer/Footer";
import LogInSignUp from "./components/user/loginsignup";
import Home from "./components/Home/Home.js";
import Loader from "./components/layout/loader/Loader.js";
import ProductDetails from "./components/Home/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import store from "./store";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/user/Porfile.js";
import ProtectedRoute from "./components/route/ProtectedRoute.js";
import { Navigate } from "react-router-dom";
import UpdateProfile from "./components/user/UpdateProfile.js";
import UpdatePassword from "./components/user/UpdatePassword.js";
import ForgotPassword from "./components/user/ForgotPassword.js";
import ResetPassword from "./components/user/ResetPassword.js";
import Cart from "./components/layout/Cart/Cart.js";
import Shipping from "./components/layout/Cart/Shipping.js";
import ConfirmOrder from "./components/layout/Cart/ConfirmOrder.js";
import Payment from "./components/layout/Cart/Payment.js";
import MyOrders from "./components/Orders/MyOrders.js";

import OrderDetails from "./components/Orders/OrderDetails.js";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

function App() {
  const { user, isAuthenticated,loading} = useSelector((state) => state.user);
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Chilanka", "Droid Sans", "Roboto", "sans-serif"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login-register" element={<LogInSignUp />} />
        <Route  path="/password/forgot" element={<ForgotPassword />}/>
        <Route  path="/password/reset/:token" element={<ResetPassword />}/>
        <Route path="/cart" element={<Cart/>}/>

        

      {/* chapiaaan */}
        {loading ? (<Route  path="/account" element={<Loader />}/>
      ) : (isAuthenticated && <Route  path="/account" element={<Profile />}/>)}
        {!isAuthenticated && <Route path="/account" element={<LogInSignUp />} />}

      
        {/* <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />} />
        </Route> */}
        {/*update profile */}
        {loading ? (<Route  path="/me/update" element={<Loader />}/>
      ) : (isAuthenticated && <Route  path="/me/update" element={<UpdateProfile />}/>)}
      {/*update password */}
      {loading ? (<Route  path="/password/update" element={<Loader />}/>
      ) : (isAuthenticated && <Route  path="/password/update" element={<UpdatePassword />}/>)}
      {/*Shipping*/}
      {loading ? (<Route  path="/shipping" element={<Loader />}/>
      ) : (isAuthenticated && <Route  path="/shipping" element={<Shipping />}/>)}
 {/*order confirm*/}
      {loading ? (<Route  path="/order/confirm" element={<Loader />}/>
      ) : (isAuthenticated && <Route  path="/order/confirm" element={<ConfirmOrder/>}/>)}
      {/*payment confirm*/}
     
      {loading ? (<Route  path="/process/payment" element={<Loader />}/>
      ) : (isAuthenticated && <Route  path="/process/payment" element={<Payment/>}/>)}

      {loading ? (<Route  path="/orders" element={<Loader />}/>
      ) : (isAuthenticated && <Route  path="/orders" element={<MyOrders/>}/>)}

      {loading ? (<Route  path="/order/:id" element={<Loader />}/>
      ) : (isAuthenticated && <Route  path="/order/:id" element={<OrderDetails/>}/>)}


      




      </Routes>
      

      <Footer />
    </Router>
  );
}

export default App;
