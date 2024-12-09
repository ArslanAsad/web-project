import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: { "x-auth-token": token },
      };

      try {
        const [salesRes, productsRes, ordersRes] = await Promise.all([
          axios.get("/api/orders/sales", config),
          axios.get("/api/products/low-stock", config),
          axios.get("/api/orders/recent", config),
        ]);

        setSalesData(salesRes.data);
        setLowStockProducts(productsRes.data);
        setRecentOrders(ordersRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Sales Overview */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Sales Overview
          </h2>
          <p className="text-sm text-gray-500">
            Your sales performance over time
          </p>
        </div>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#4F46E5"
                fill="#6366F1"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Stock Products and Recent Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Low Stock Products */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Low Stock Products
            </h2>
            <p className="text-sm text-gray-500">
              Products that need restocking
            </p>
          </div>
          <ul className="space-y-2">
            {lowStockProducts.map((product) => (
              <li
                key={product._id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
              >
                <span className="text-gray-700">{product.name}</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                  Stock: {product.stock}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h2>
            <p className="text-sm text-gray-500">Latest customer orders</p>
          </div>
          <ul className="space-y-2">
            {recentOrders.map((order) => (
              <li
                key={order._id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
              >
                <span className="text-gray-700">
                  Order #{order._id.slice(-6)}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  ${order.totalAmount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
