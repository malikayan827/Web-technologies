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
      {/* chapiaaan */}
        {loading ? (<Route  path="/account" element={<Loader />}/>
      ) : (isAuthenticated && <Route  path="/account" element={<Profile />}/>)}
        {!isAuthenticated && <Route path="/account" element={<LogInSignUp />} />}
      
        {/* <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />} />
        </Route> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
