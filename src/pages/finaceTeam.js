import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
  Textarea,
  Button,
  Text,
  useToast, // Import useToast hook
} from "@chakra-ui/react";
import "./adminpage.css";
import MyRequests from "./myReuests";
import Navbar from "./navBar";

const FinanceTeam = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectMessage, setRejectMessage] = useState(""); // State for reject message
  const [selectedRequestId, setSelectedRequestId] = useState(null); // State to store the selected request ID
  const [selectedApprove, setSelectedApprove] = useState(false); // State to store the selected approval status
  const [selectedReject, setSelectedReject] = useState(false); // State to store the selected rejection status
  const toast = useToast(); // Initialize useToast hook

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await axios.get(
          `http://localhost:5000/pendingrequests/${username}`
        );
        setPendingRequests(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError("Error fetching requests. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchRequests();

    const intervalId = setInterval(fetchRequests, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      let requestData = { status: newStatus };
      if (newStatus === "Rejected") {
        requestData.rejected_message = rejectMessage; // Include rejected message if status is Rejected
      }
      await axios.put(`http://localhost:5000/requests/${id}`, requestData);
      const updatedRequests = pendingRequests.map((request) =>
        request._id === id ? { ...request, status: newStatus } : request
      );
      setPendingRequests(updatedRequests);
      setRejectMessage(""); // Clear reject message after status update
      setSelectedRequestId(null); // Clear selected request ID after status update
      setSelectedApprove(false); // Clear selected approval status after status update
      setSelectedReject(false); // Clear selected rejection status after status update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleRejectMessageChange = (event) => {
    setRejectMessage(event.target.value);
  };

  const handleActionSubmit = (id) => {
    if (selectedApprove) {
      handleStatusUpdate(id, "Approved");
    } else if (selectedReject) {
      handleStatusUpdate(id, "Rejected");
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <>
      <Navbar/>
      <div className="box">
        <h1 className="h1-tag">FinanceTeam Page - Requests</h1>
        <div className="table-container">
          {pendingRequests.length > 0 ? (
            <Table variant="simple" className="admin-table">
              <Thead>
                <Tr>
                  <Th>Category</Th>
                  <Th>Request Details</Th>
                  <Th>Price Quotation</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                  <Th>Status</Th>
                  <Th>Reject Message</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pendingRequests.map((request, index) => (
                  <Tr key={index}>
                    <Td>{request.category}</Td>
                    <Td>{request.description}</Td>
                    <Td>{request.priceQuotation}</Td>
                    <Td>{request.quantity}</Td>
                    <Td>{request.price}</Td>
                    <Td>
                      <Checkbox
                        isChecked={
                          selectedApprove && selectedRequestId === request._id
                        }
                        onChange={() => {
                          setSelectedApprove(true);
                          setSelectedReject(false);
                          setSelectedRequestId(request._id);
                        }}
                      >
                        Approve
                      </Checkbox>
                      <span style={{ marginRight: "25px" }}></span>
                      <Checkbox
                        isChecked={
                          selectedReject && selectedRequestId === request._id
                        }
                        onChange={() => {
                          setSelectedApprove(false);
                          setSelectedReject(true);
                          setSelectedRequestId(request._id);
                        }}
                      >
                        Reject
                      </Checkbox>
                    </Td>
                    <Td>
                      <Textarea
                        value={rejectMessage}
                        onChange={handleRejectMessageChange}
                        disabled={
                          !selectedReject || selectedRequestId !== request._id
                        }
                      />
                    </Td>
                    <Td>
                      {selectedRequestId === request._id && (
                        <Button
                          colorScheme="red"
                          onClick={() => handleActionSubmit(request._id)}
                          disabled={
                            !(selectedApprove || selectedReject) || // Disable if neither approve nor reject is selected
                            (selectedReject && !rejectMessage.trim()) // Disable if reject is selected but no reject message
                          }
                        >
                          Submit
                        </Button>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>No pending requests found</Text>
          )}
        </div>
      </div>
      <MyRequests />
    </>
  );
};

export default FinanceTeam;
