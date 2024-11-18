import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import Products from '../components/Products';
import Footer from '../components/Footer';
import FlashSale from '../components/FlashSale';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [bannerImg, setBannerImg] = useState('/images/home-banner-2.png'); // Default static banner
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    fetchBanner();
  }, []);

  // Fetch banner dynamically from backend
  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:6001/fetch-banner');
      if (response.data && response.data.bannerUrl) {
        setBannerImg(`http://localhost:6001${response.data.bannerUrl}`); // Update banner with fetched URL
      } else {
        console.error('Banner URL not found in response');
      }
    } catch (err) {
      console.error('Error fetching banner:', err);
      setError('Failed to load dynamic banner'); // Handle fetch error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="HomePage">
      {/* Home Banner Section */}
      <div className="home-banner">
        {loading ? (
          <p>Loading banner...</p>
        ) : (
          <img src={bannerImg} alt="Home Banner" />
        )}
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Flash Sale Section */}
      <FlashSale />

      {/* Categories Section */}
      <div className="home-categories-container">
        <div
          className="home-category-card"
          onClick={() => navigate('/category/Fashion')}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQjXpWVVQhkT_A2n03XMo2KDV4yPSLBcoNA&usqp=CAU"
            alt="Fashion"
          />
          <h5>Fashion</h5>
        </div>

        <div
          className="home-category-card"
          onClick={() => navigate('/category/Electronics')}
        >
          <img
            src="https://5.imimg.com/data5/ANDROID/Default/2023/1/SE/QC/NG/63182719/product-jpeg-500x500.jpg"
            alt="Electronics"
          />
          <h5>Electronics</h5>
        </div>

        <div
          className="home-category-card"
          onClick={() => navigate('/category/Mobiles')}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jUW7v1WFJL9Ylax9a4vazyKXwG-ktSinI4Rd7qi7MkhMr79UlIyyrNkbiK0Cz5u6WYw&usqp=CAU"
            alt="Mobiles"
          />
          <h5>Mobiles</h5>
        </div>

        <div
          className="home-category-card"
          onClick={() => navigate('/category/Groceries')}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbpV_yQ_zCtZt_1kNebjvFqXvdDnLuuJPsQ&usqp=CAU"
            alt="Groceries"
          />
          <h5>Groceries</h5>
        </div>

        <div
          className="home-category-card"
          onClick={() => navigate('/category/Sports Equipment')}
        >
          <img
            src="https://a.storyblok.com/f/112937/568x464/82f66c3a21/all_the_english-_football_terms_you_need_to_know_blog-hero-low.jpg/m/620x0/filters:quality(70)/"
            alt="Sports Equipment"
          />
          <h5>Sports Equipment</h5>
        </div>
      </div>

      {/* Products Section */}
      <div id="products-body"></div>
      <Products category="all" />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
