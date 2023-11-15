
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router} from 'react-router-dom';
import webfont from 'webfontloader';
import React from 'react';
import Footer from './components/Footer/Footer';

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
      <Header/>
      <Footer/>
    </Router>
  

  );
}

export default App;
