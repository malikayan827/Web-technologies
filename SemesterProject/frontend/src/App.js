import './App.css';
import Header from './components/layout/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import webfont from 'webfontloader';
import React from 'react';
import Footer from './components/layout/Footer/Footer';
import LogInSignUp from './components/user/loginsignup';
import Home from "./components/Home/Home.js"


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
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
