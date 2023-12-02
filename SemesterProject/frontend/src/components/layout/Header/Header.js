import React, { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const handleToggleNav = () => {
    setOpen(!isOpen);
  };

  const handleCloseNav = () => {
    setOpen(false);
  };

  return (
    <nav>
      <ul className={`navbar  ${isOpen ? "open" : ""}`}>
        <li className="logo">Ecommerce</li>
        <li className="btn" onClick={handleToggleNav}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </li>
        <div className={`items  ${isOpen ? "open items2" : ""}`}>
          <li>
            <Link className="items" href="#" onClick={handleCloseNav}>
              Home
            </Link>
          </li>
          <li>
            <Link className="items" href="#" onClick={handleCloseNav}>
              About
            </Link>
          </li>
          <li>
            <Link className="items" href="#" onClick={handleCloseNav}>
              Services
            </Link>
          </li>
          <li>
            <Link className="items" href="#" onClick={handleCloseNav}>
              Contact
            </Link>
          </li>
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