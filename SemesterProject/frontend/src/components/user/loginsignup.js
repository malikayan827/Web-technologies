import React, { Fragment, useRef, useState,useEffect } from "react";
import "./loginsignup.css";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch ,useSelector} from "react-redux";
import { login,clearErrors,register } from "..//..//actions//userAction";
import { toast } from 'react-toastify';
import Loader from "../layout/loader/Loader";
import { useNavigate } from 'react-router-dom';
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";

const LogInSignUp = (location) => {
  const dispatch = useDispatch();

  const loginTab = useRef(null);
  const switcherTab = useRef(null);
  const registerTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({  
    name: "",
    email: "",
    password: ""
  
  }) 
  const { name, email, password } = user;
  const [image, setImage] = useState();
  const [imgPrev, setImgPrev] = useState("/Profile.png");


  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    
  };
  const registerSubmit=(e)=>{
    e.preventDefault();
    const myform=new FormData();
    myform.set("name",name);
    myform.set("email",email);
    myform.set("password",password);
    
    myform.set("image",image);
    dispatch(register(myform));
    
    

  }
  const registerDataChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImgPrev(reader.result);
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const navigate = useNavigate();
  const {loading,error,isAuthenticated}=useSelector(state=>state.user)
  // const redirect=location.search?location.search.split("=")[1]:"/account"
  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors())
    }
    if(isAuthenticated){
      navigate("/account")
    }
    
  }, [dispatch,error,isAuthenticated]);

  return (
    <Fragment>
        {loading ? <Loader/> :(<Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forget Password?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
            
            <div id="registerImage">
            <img src={imgPrev} alt="Prev"/>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="signUpBtn"/>
            {/* disabled={loading?true:false} /> */}

          </form>
        </div>
      </div>
    </Fragment>)
        }
    </Fragment>
  );
};

export default LogInSignUp;
