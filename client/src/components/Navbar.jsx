import React, { useState, useEffect, useContext } from 'react';
import { BsCart3, BsPersonCircle } from 'react-icons/bs';
import { FcSearch } from 'react-icons/fc';
import { ImCancelCircle } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import axios from 'axios';
import debounce from 'lodash.debounce'; // Import debounce from lodash
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const usertype = localStorage.getItem('userType');
  const username = localStorage.getItem('username');
  const { cartCount, logout } = useContext(GeneralContext);

  const [productSearch, setProductSearch] = useState('');
  const [noResult, setNoResult] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for search

  // Debounced search function
  const handleSearch = debounce(async () => {
    const trimmedQuery = productSearch.trim();
    if (!trimmedQuery) {
      setSearchResults([]);
      setNoResult(false);
      return;
    }

    setLoading(true); // Set loading to true

    try {
      const response = await axios.get('http://localhost:6001/search', {
        params: { query: trimmedQuery },
      });

      const products = response.data;

      if (products && products.length > 0) {
        setSearchResults(products);
        setNoResult(false);
      } else {
        setSearchResults([]);
        setNoResult(true);
      }
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
      setNoResult(true);
    } finally {
      setLoading(false); // Set loading to false
    }
  }, 500); // Debounce with 500ms delay

  useEffect(() => {
    // Cancel debounced function on unmount
    return () => handleSearch.cancel();
  }, []);

  // Handle "Enter" key press to navigate
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (searchResults.length > 0) {
        navigate(`/product/${searchResults[0]._id}`); // Navigate to the first product if results exist
      } else {
        setNoResult(true); // Show no result message if no products are found
      }
    }
  };

  return (
    <>
      {/* user navbar */}
      {!usertype ? (
        <div className="navbar">
          <h3 onClick={() => navigate('')}>ShopEZ</h3>
          <div className="nav-content">
            <div className="nav-search">
              <input
                type="text"
                name="nav-search"
                id="nav-search"
                placeholder="Search Electronics, Fashion, mobiles, etc."
                onChange={(e) => setProductSearch(e.target.value)}
                onKeyUp={handleKeyPress} // Trigger search on key up
              />
              <FcSearch className="nav-search-icon" onClick={() => handleSearch()} />
              {loading && <div>Loading...</div>} {/* Loading indicator */}

              {noResult && !loading && (
                <div className="search-result-data">
                  No items found.... try searching for Electronics, mobiles, Groceries, etc.
                  <ImCancelCircle
                    className="search-result-data-close-btn"
                    onClick={() => setNoResult(false)}
                  />
                </div>
              )}
            </div>

            <button className="btn" onClick={() => navigate('/auth')}>
              Login
            </button>
          </div>
        </div>
      ) : (
        <>
          {usertype === 'customer' ? (
            <div className="navbar">
              <h3 onClick={() => navigate('')}>ShopEZ</h3>
              <div className="nav-content">
                <div className="nav-search">
                  <input
                    type="text"
                    name="nav-search"
                    id="nav-search"
                    placeholder="Search Electronics, Fashion, mobiles, etc."
                    onChange={(e) => setProductSearch(e.target.value)}
                    onKeyUp={handleKeyPress} // Trigger search on key up
                  />
                  <FcSearch className="nav-search-icon" onClick={() => handleSearch()} />
                  {loading && <div>Loading...</div>} {/* Loading indicator */}

                  {noResult && !loading && (
                    <div className="search-result-data">
                      No items found.... try searching for Electronics, mobiles, Groceries, etc.
                      <ImCancelCircle
                        className="search-result-data-close-btn"
                        onClick={() => setNoResult(false)}
                      />
                    </div>
                  )}
                </div>

                <div className="nav-content-icons">
                  <div className="nav-profile" onClick={() => navigate('/profile')}>
                    <BsPersonCircle
                      className="navbar-icons"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Profile"
                    />
                    <p>{username}</p>
                  </div>
                  <div className="nav-cart" onClick={() => navigate('/cart')}>
                    <BsCart3
                      className="navbar-icons"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Cart"
                    />
                    <div className="cart-count">{cartCount}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar-admin">
              <h3 onClick={() => navigate('/admin')}>ShopEZ (admin)</h3>

              <ul>
                <li onClick={() => navigate('/admin')}>Home</li>
                <li onClick={() => navigate('/all-users')}>Users</li>
                <li onClick={() => navigate('/all-orders')}>Orders</li>
                <li onClick={() => navigate('/all-products')}>Products</li>
                <li onClick={() => navigate('/new-product')}>New Product</li>
                <li onClick={logout}>Logout</li>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Navbar;
