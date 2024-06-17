// RequestDetail.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Text, Spinner } from "@chakra-ui/react";

const RequestDetail = () => {
  const { requestId } = useParams(); // Get the request ID from URL parameters
  const [requestDetails, setRequestDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(
          `https://piqyu.onrender.com/request/${requestId}` // Replace with your endpoint to fetch request details by ID
        );
        setRequestDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching request details:", error);
        setError("Error fetching request details. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchRequestDetails();
  }, [requestId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  if (!requestDetails) {
    return <Text>No request details found</Text>;
  }

  return (
    <div>
      <h1>Request Detail</h1>
      <p>Category: {requestDetails.category}</p>
      <p>Description: {requestDetails.description}</p>
      {/* Add more details here */}
    </div>
  );
};

export default RequestDetail;
