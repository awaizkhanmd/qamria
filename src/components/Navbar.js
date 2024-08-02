import React, { useState } from 'react';
import './ResponsiveNavbar.css'; // Make sure this CSS file exists and contains your styles
import Logo from "../assests/logo.png"; // Update the path if needed
import { Link } from 'react-router-dom';

const ResponsiveNavbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const pages = [
    { name: 'Join Our Team', path: '/team' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' }
  ];
  const settings = [
    { name: 'Profile', path: '/profile' },
    { name: 'Account', path: '/account' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Logout', path: '/logout' }
  ];

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <button className="navbar-toggle" aria-expanded={isNavExpanded} onClick={() => setIsNavExpanded(!isNavExpanded)}>
        &#9776;
      </button>
      <div className={`navbar-menu ${isNavExpanded ? 'expanded' : ''}`}>
        <ul className="navbar-links">
          {pages.map((page) => (
            <li key={page.name}>
              <Link to={page.path} onClick={() => setIsNavExpanded(false)}>
                {page.name}
              </Link>
            </li>
          ))}
          {settings.map((setting) => (
            <li key={setting.name}>
              <Link to={setting.path} onClick={() => setIsNavExpanded(false)}>
                {setting.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default ResponsiveNavbar;
