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

function App() {
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Chilanka","Droid Sans",'Roboto', 'sans-serif']
      }
    });
  }, []);

  return (
    <Router>
      

      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact  path="/product/:id" element={<ProductDetails />} />
        <Route exact  path="/products" element={<Products/>} />
        
       
      </Routes>
      <Footer />
    </Router>
    
   
    
  );
}

export default App;
