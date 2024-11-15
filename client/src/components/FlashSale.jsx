import React, { useEffect, useState } from 'react';
import '../styles/FlashSale.css';

const FlashSale = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    // Fetch products for the flash sale
    useEffect(() => {
      const fetchFlashSaleProducts = async () => {
        try {
            const response = await fetch('http://localhost:6001/flash-sale-products', {
              cache: 'no-cache'  // Force the request to bypass cache
          });
        if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched products:", data); // Debugging
            const flashSaleProducts = data.filter(product => product.isFlashSale);
            console.log("Filtered flash sale products:", flashSaleProducts); // Debugging
            setProducts(flashSaleProducts);
        } catch (error) {
            setError("Error fetching flash sale products. Please try again later.");
            console.error("Error fetching flash sale products", error);
        }
    };
    

        fetchFlashSaleProducts();
    }, []);

    const handleProductClick = (productId) => {
        // Open individual product page in a new tab
        window.open(`/product/${productId}`, '_blank');
    };

    return (
        <div className="flashSaleContainer">
            <h3>Flash Sale</h3>

            {error && <p className="error-message">{error}</p>}

            <div className="flashSale-body">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="flashSaleCard" key={product._id} onClick={() => handleProductClick(product._id)}>
                            <img src={product.mainImg || "https://encrypted-tbn0.C.com/images?q=tbn:ANd9GcSGnbY9YlH663xUNGHOe0lS9n-zSwrLtiEFVw&usqp=CAU"} alt={product.title} />
                            <div className="flashSaleCard-data">
                                <h6>{product.title}</h6>
                                <p>{product.description}</p>
                                <h5>{product.discount}% off</h5>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No flash sale products available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default FlashSale;
