import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Textarea,
  Button,
  Text,
  useToast,
  Modal,
  Checkbox,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import "./adminpage.css";
import Navbar from "./navBar";
import Allrequests from "./Allrequests";

const FinanceTeam = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectMessage, setRejectMessage] = useState(""); // State for reject message
  const [selectedRequestId, setSelectedRequestId] = useState(null); // State to store the selected request ID
  const [selectedApprove, setSelectedApprove] = useState(false); // State to store the selected approval status
  const [selectedReject, setSelectedReject] = useState(false); // State to store the selected rejection status
  const [requestDetails, setRequestDetails] = useState(null); // State to store the request details for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const toast = useToast(); // Initialize useToast hook

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await axios.get(
          `https://piqyu.onrender.com/pendingrequests/${username}`
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
      await axios.put(`https://piqyu.onrender.com/requests/${id}`, requestData);
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

  const handleActionSubmit = async (id) => {
    if (selectedApprove) {
      handleStatusUpdate(id, "Approved");
    } else if (selectedReject) {
      handleStatusUpdate(id, "Rejected");
    }
  };

  const handleViewDetailsClick = async (id) => {
    setSelectedRequestId(id);
    try {
      const response = await axios.get(
        `https://piqyu.onrender.com/requests/${id}`
      );
      setRequestDetails(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching request details:", error);
      toast({
        title: "Error",
        description: "Error fetching request details. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRequestDetails(null);
    setSelectedRequestId(null);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <>
      <Navbar />
      <div className="box">
        <h1 className="h1-tag">Finance Team Approvals & Requests</h1>
        <div className="table-container">
          {pendingRequests.length > 0 ? (
            <Table variant="simple" size="s" className="admin-table">
              <Thead>
                <Tr>
                  <Th>Requester</Th>
                  <Th>Category</Th>
                  <Th>Request Details</Th>
                  <Th>Price Quotation</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                  <Th>Status</Th>
                  <Th>Remarks</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pendingRequests.map((request, index) => (
                  <Tr key={index}>
                    <Td>{request.requester.toUpperCase()}</Td>
                    <Td>{request.category}</Td>
                    <Td>
                      <Text
                        color="blue"
                        textDecoration="underline"
                        cursor="pointer"
                        onClick={() => handleViewDetailsClick(request._id)}
                      >
                        {request.description.substring(0, 30)}...{" "}
                        {/* Display first 50 characters */}
                      </Text>
                    </Td>
                    <Td color="blue">
                      {request.priceQuotation === "no file" ? (
                        "No file"
                      ) : (
                        <a
                          href={`https://piqyu.onrender.com/files/${request.priceQuotation}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {request.priceQuotation.substring(0, 30)}...{" "}
                        </a>
                      )}
                    </Td>
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
            <Text padding="100px">No pending requests found</Text>
          )}
        </div>
      </div>
      <Allrequests />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {requestDetails && (
              <div>
                <p>Category: {requestDetails.category}</p>
                <p>Description: {requestDetails.description}</p>
                {/* Add more details here */}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FinanceTeam;
