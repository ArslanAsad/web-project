import React, { useState, useEffect } from "react";
import axios from "axios";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [newPromotion, setNewPromotion] = useState({
    code: "",
    discountPercentage: "",
    validFrom: "",
    validTo: "",
    products: [],
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchPromotions();
    fetchProducts();
  }, []);

  const fetchPromotions = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    try {
      const res = await axios.get("/api/promotions", config);
      setPromotions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    try {
      const res = await axios.get("/api/products", config);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setNewPromotion({ ...newPromotion, [e.target.name]: e.target.value });
  };

  const handleProductSelection = (e) => {
    const selectedProducts = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setNewPromotion({ ...newPromotion, products: selectedProducts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    try {
      await axios.post("/api/promotions", newPromotion, config);
      setNewPromotion({
        code: "",
        discountPercentage: "",
        validFrom: "",
        validTo: "",
        products: [],
      });
      fetchPromotions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Promotions</h2>
      <form
        onSubmit={(e) => handleSubmit(e, newPromotion)}
        className="space-y-4 mb-6"
      >
        <input
          type="text"
          name="code"
          value={newPromotion.code}
          onChange={handleInputChange}
          placeholder="Promotion Code"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="discountPercentage"
          value={newPromotion.discountPercentage}
          onChange={handleInputChange}
          placeholder="Discount Percentage"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-4">
          <input
            type="date"
            name="validFrom"
            value={newPromotion.validFrom}
            onChange={handleInputChange}
            required
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="validTo"
            value={newPromotion.validTo}
            onChange={handleInputChange}
            required
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          multiple
          onChange={handleProductSelection}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create Promotion
        </button>
      </form>
      <ul className="space-y-2">
        {promotions.map((promotion) => (
          <li
            key={promotion._id}
            className="flex items-center justify-between border-b pb-2"
          >
            <span className="font-medium">{promotion.code}</span>
            <span className="text-green-500">
              {promotion.discountPercentage}% off
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Promotions;
