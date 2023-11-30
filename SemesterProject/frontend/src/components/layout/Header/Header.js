import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { FaSearch } from "react-icons/fa"; 
import logo from "..//..//..//images//logo.png";

import "./Header.css";

const Header = () => {
  return (
    <nav>
      <ul>
        <li className="logo">Ecommerce</li>
        <li className="btn"><span className="fas fa-bars"></span></li>
        <div className="items">
          <li><a className="items" href="#">Home</a></li>
          <li><a className="items" href="#">About</a></li>
          <li><a className="items" href="#">Services</a></li>
          <li><a className="items" href="#">Contact</a></li>
        </div>
        <li className="search-icon">
          <input type="search" placeholder="Search" />
          <label className="icon">
            <FaSearch /> 
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
