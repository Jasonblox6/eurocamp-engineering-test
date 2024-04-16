import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import eurocamp from '../../Assets/eurocamp.png'
import './NavBar.css'

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>('');

  //Get Location
  const location = useLocation();

  useEffect(() => {
    //If the location changes, get the pathname
    const pathname = location.pathname;
    //This allows styling the active header
    setActiveLink(pathname);
  }, [location]);

  return (
    <nav>
      <div className="logo">
        <img src={eurocamp} alt="Logo" style={{ width: 'auto', height: '36px' }} />
      </div>
      <ul>
        <li>
          <Link to="/bookings" className={`nav-link ${activeLink === '/bookings' ? 'active' : ''}`}>Bookings</Link>
          <div className="divider" />
        </li>
        <li>
          <Link to="/parcs" className={`nav-link ${activeLink === '/parcs' ? 'active' : ''}`}>Parcs</Link>
          <div className="divider" />
        </li>
        <li>
          <Link to="/users" className={`nav-link ${activeLink === '/users' ? 'active' : ''}`}>Users</Link>
          <div className="divider" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;