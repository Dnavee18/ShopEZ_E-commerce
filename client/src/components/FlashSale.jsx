import React from 'react';
import '../styles/FlashSale.css';
import { useNavigate } from 'react-router-dom';

const FlashSale = () => {
  const navigate = useNavigate();

  // Sample products data with unique product ids
  const flashSaleProducts = [
    {
      id: '1',
      title: 'Product 1',
      description: 'Description about product 1',
      discount: '30% off',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnbY9YlH663xUNGHOe0lS9n-zSwrLtiEFVw&usqp=CAU',
    },
    {
      id: '2',
      title: 'Product 2',
      description: 'Description about product 2',
      discount: '40% off',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnbY9YlH663xUNGHOe0lS9n-zSwrLtiEFVw&usqp=CAU',
    },
    {
      id: '3',
      title: 'Product 3',
      description: 'Description about product 3',
      discount: '25% off',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnbY9YlH663xUNGHOe0lS9n-zSwrLtiEFVw&usqp=CAU',
    },
    {
      id: '4',
      title: 'Product 4',
      description: 'Description about product 4',
      discount: '50% off',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnbY9YlH663xUNGHOe0lS9n-zSwrLtiEFVw&usqp=CAU',
    },
    {
      id: '5',
      title: 'Product 5',
      description: 'Description about product 5',
      discount: '20% off',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnbY9YlH663xUNGHOe0lS9n-zSwrLtiEFVw&usqp=CAU',
    },
    {
      id: '6',
      title: 'Product 6',
      description: 'Description about product 6',
      discount: '35% off',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnbY9YlH663xUNGHOe0lS9n-zSwrLtiEFVw&usqp=CAU',
    },
  ];

  return (
    <div className="flashSaleContainer">
      <h3>Flash Sale</h3>
      <div className="flashSale-body">
        {flashSaleProducts.map((product) => (
          <div
            key={product.id}
            className="flashSaleCard"
            onClick={() => navigate(`/product/${product.id}`)} // Navigate to individual product page
          >
            <img src={product.image} alt={product.title} />
            <div className="flashSaleCard-data">
              <h6>{product.title}</h6>
              <p>{product.description}</p>
              <h5>{product.discount}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
