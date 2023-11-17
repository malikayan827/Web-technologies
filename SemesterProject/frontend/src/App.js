
import './App.css';
import Header from './components/layout/Header/Header';
import { BrowserRouter as Router} from 'react-router-dom';
import webfont from 'webfontloader';
import React from 'react';
import Footer from './components/layout/Footer/Footer';
import LogInSignUp from './components/user/loginsignup';
import { Route } from 'react-router-dom';

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
      {/* <Header/>
      <Route exact path="/login" component={LogInSignUp}/>
      <Footer/> */}
      <LogInSignUp/>
      
    </Router>
  

  );
}

export default App;
