import React, { useState, useEffect } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [response, setResponse] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    try {
      const res = await axios.get("/api/reviews", config);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const submitResponse = async (reviewId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    try {
      await axios.post(
        `/api/reviews/${reviewId}/response`,
        { response },
        config
      );
      setResponse("");
      setSelectedReview(null);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      <ul className="space-y-6">
        {reviews.map((review) => (
          <li key={review._id} className="border-b pb-4">
            <p className="font-medium">{review.product.name}</p>
            <p className="text-yellow-500">Rating: {review.rating}/5</p>
            <p className="text-gray-700 mt-2">{review.comment}</p>
            {review.response ? (
              <p className="mt-2 text-blue-600">
                Your response: {review.response}
              </p>
            ) : (
              <>
                <button
                  onClick={() => setSelectedReview(review._id)}
                  className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Respond
                </button>
                {selectedReview === review._id && (
                  <div className="mt-2 space-y-2">
                    <textarea
                      value={response}
                      onChange={handleResponseChange}
                      placeholder="Your response"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button
                      onClick={() => {
                        submitResponse(review._id, response);
                        setSelectedReview(null);
                        setResponse("");
                      }}
                      className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Submit Response
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
