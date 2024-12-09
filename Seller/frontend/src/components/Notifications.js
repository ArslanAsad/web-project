import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    try {
      const res = await axios.get("/api/notifications", config);
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (notificationId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    try {
      await axios.put(
        `/api/notifications/${notificationId}`,
        { read: true },
        config
      );
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification._id}
            className="flex items-center justify-between border-b pb-2"
          >
            <span className="text-gray-700">{notification.message}</span>
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification._id)}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
