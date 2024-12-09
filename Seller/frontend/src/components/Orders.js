import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    try {
      const res = await axios.get("/api/orders", config);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    try {
      await axios.put(`/api/orders/${orderId}`, { status }, config);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order._id}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <span className="font-medium">Order #{order._id}</span>
              <span className="ml-2 text-gray-600">${order.totalAmount}</span>
              <span className="ml-2 text-sm text-gray-500">
                Status: {order.status}
              </span>
            </div>
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
