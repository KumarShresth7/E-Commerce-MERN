import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import { baseUrl } from "../baseUrl";
import "./styles/ProductList.css";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-list-container mt-5">
      <div className="search-bar mb-6">
        <i className="search-icon fas fa-search"></i>{" "}
        {/* Font Awesome search icon */}
        <input
          type="text"
          className="form-control"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product._id} className="col-md-4">
            <Product product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
