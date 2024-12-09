import React, { useState, useEffect } from "react";
import axios from "axios";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    try {
      const res = await axios.get("/api/payments", config);
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Payment Reports</h2>
      <ul className="space-y-2">
        {payments.map((payment) => (
          <li
            key={payment._id}
            className="flex items-center justify-between border-b pb-2"
          >
            <span className="font-medium">Order# {payment.order}</span>
            <span className="text-gray-600">${payment.amount}</span>
            <span
              className={`text-sm ${
                payment.status === "Paid" ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {payment.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payments;
