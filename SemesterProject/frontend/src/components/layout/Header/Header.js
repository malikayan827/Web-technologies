import React, { useState } from "react";
import { FaSearch, FaBars ,FaUser,FaShoppingCart } from "react-icons/fa";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useDispatch } from 'react-redux';
import { setSearchTerm } from "../../../actions/searchActions";
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.search);

  const handleToggleNav = () => {
    const menu = document.querySelector('.navbar');
    menu.classList.toggle('open');
  };
  
  const handleCloseNav = () => {
    const menu = document.querySelector('.navbar');
    menu.classList.remove('open');
  };


const debouncedSearch = debounce((value) => {
  dispatch(setSearchTerm(value));
}, 300);
  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <nav>
      <ul className={`navbar ${isOpen ? "open" : ""}`}>
        <li className="logo">Ecommerce</li>
        <li className="btn" onClick={handleToggleNav}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </li>
        <div className={`items items-mobile ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className="items" onClick={handleCloseNav}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="items" onClick={handleCloseNav}>
              Product
            </Link>
          </li>
          {/* <li>
            <Link to="/services" className="items" onClick={handleCloseNav}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="items" onClick={handleCloseNav}>
              Contact
            </Link>
          </li> */}
          <li>
            <Link to="/login-register" className="items" onClick={handleCloseNav}>
              <FaUser />
            </Link>
          </li>
          <li>
            <Link to="/Cart" className="items" onClick={handleCloseNav}>
              <FaShoppingCart />
            </Link>
          </li>
        </div>
        {/* <li className="search-icon">
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
          <label className="icon">
            <FaSearch />
          </label>
        </li> */}
      </ul>
    </nav>
  );
};

export default Header;
