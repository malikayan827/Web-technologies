import './App.css';
import Header from './components/layout/Header/Header';
// Import Bootstrap CSS in your index.js or App.js file
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import webfont from 'webfontloader';
import React from 'react';
import Footer from './components/layout/Footer/Footer';
import LogInSignUp from './components/user/loginsignup';
import Home from "./components/Home/Home.js"
import Loader from './components/layout/loader/Loader.js';
import ProductDetails from './components/Home/Product/ProductDetails.js';
import Products from './components/Product/Products.js';
import store from './store';
import { loadUser } from './actions/userAction.js';
import UserOptions from './components/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Chilanka","Droid Sans",'Roboto', 'sans-serif']
      }
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        {isAuthenticated && (
          <Route
            path="/products"
            element={<UserOptions user={user} />}
          />
        )}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login-register" element={<LogInSignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
