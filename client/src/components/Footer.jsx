import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const navigate = useNavigate(); // Hook for navigation

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Adds a smooth scrolling effect
    });
  };

  return (
    <div className="Footer">
      <h4>@ShopEZ - One Destination for all your needs....</h4>
      <div className="footer-body">
        <ul>
          <li
            onClick={() => {
              navigate('');
              scrollToTop(); // Scroll to top after navigation
            }}
          >
            Home
          </li>
          <li onClick={() => navigate('/cart')}>Cart</li>
        </ul>

        <ul>
          <li onClick={() => navigate('/profile')}>Profile</li>
          <li onClick={() => navigate('/category/mobiles')}>Mobiles</li>
        </ul>

        <ul>
          <li onClick={() => navigate('/category/Electronics')}>Electronics</li>
          <li onClick={() => navigate('/category/Fashion')}>Fashion</li>
        </ul>

        <ul>
          <li onClick={() => navigate('/category/Groceries')}>Grocery</li>
          <li onClick={() => navigate('/category/Sports-Equipment')}>Sports</li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>@ ShopEZ.com - All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;


