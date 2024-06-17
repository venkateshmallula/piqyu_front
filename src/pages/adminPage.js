import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Select,
  Flex,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/react";
import "./adminpage.css";
import MyRequests from "./myReuests";
import Navbar from "./navBar";
import DrawerExample from "./dasboard";

const AdminPage = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminOptions, setAdminOptions] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState({});
  const [selectedRequestDetails, setSelectedRequestDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

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

    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admins");
        const currentUser = localStorage.getItem("username");
        const filteredAdmins = response.data.filter(
          (admin) => admin.name !== currentUser
        );
        setAdminOptions(filteredAdmins.map((admin) => admin.name));
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchRequests();
    fetchAdmins();

    const intervalId = setInterval(fetchRequests, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/requests/${id}`, {
        status: newStatus,
      });
      const updatedRequests = pendingRequests.map((request) =>
        request._id === id ? { ...request, status: newStatus } : request
      );
      setPendingRequests(updatedRequests);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleForwardRequest = async (id) => {
    try {
      const selectedAdmin = selectedAdmins[id];
      if (selectedAdmin) {
        const response = await axios.put(
          `http://localhost:5000/requests/${id}/forward`,
          {
            Approver: selectedAdmin,
          }
        );

        const flagMessage = response.data.flag;
        if (flagMessage === "none") {
          toast({
            title: "Error",
            description: "You can't forward to other admin",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Success",
            description: "Request forwarded successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        console.log("Please select an admin and enable forwarding.");
      }
    } catch (error) {
      console.error("Error forwarding request:", error);
      toast({
        title: "Error",
        description: "Error forwarding request. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRejectRequest = async (id) => {
    try {
      await axios.put(`http://localhost:5000/requests/${id}`, {
        status: "Rejected",
      });
      const updatedRequests = pendingRequests.map((request) =>
        request._id === id ? { ...request, status: "Rejected" } : request
      );
      setPendingRequests(updatedRequests);
      toast({
        title: "Request Rejected",
        description: "The request has been rejected successfully!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast({
        title: "Error",
        description: "Error rejecting request. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAdminSelectChange = (e, id) => {
    const { value } = e.target;
    setSelectedAdmins((prevSelectedAdmins) => ({
      ...prevSelectedAdmins,
      [id]: value,
    }));
  };

  const handleRequestDetailsClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/requests/${id}`);
      setSelectedRequestDetails(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequestDetails(null);
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
      <Flex>
        <Box flex="1" p={4}>
          <Text
            as="h1"
            fontSize="2xl"
            fontFamily="Noto Sans"
            mb={4}
            paddingRight={1100}
          >
          </Text>
        </Box>
        <Box paddingRight={10}>
          <DrawerExample />
        </Box>
      </Flex>
      <Box className="box" p={4}>
        <Text as="h1" fontSize="2xl" mb={4}>
          My Approvals
        </Text>
        <Box className="table-container" overflowX="auto">
          {pendingRequests.length > 0 ? (
            <Table variant="simple" className="admin-table">
              <Thead>
                <Tr>
                  <Th>Requester</Th>
                  <Th>Category</Th>
                  <Th>Request Details</Th>
                  <Th>Price Quotation</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                  <Th>Forward To</Th>
                  <Th>Actions</Th>
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
                        onClick={() => handleRequestDetailsClick(request._id)}
                      >
                        {request.description.substring(0, 30)}...
                      </Text>
                    </Td>
                    <Td color="blue">
                      {request.priceQuotation === "no file" ? (
                        "No file"
                      ) : (
                        <a
                          href={`http://localhost:5000/files/${request.priceQuotation}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {request.priceQuotation.substring(0, 30)}...
                        </a>
                      )}
                    </Td>
                    <Td>{request.quantity}</Td>
                    <Td>{request.price}</Td>
                    <Td>
                      <Select
                        placeholder="Select admin"
                        onChange={(e) =>
                          handleAdminSelectChange(e, request._id)
                        }
                        value={selectedAdmins[request._id] || ""}
                      >
                        {adminOptions.map((admin, index) => (
                          <option key={index} value={admin}>
                            {admin.toUpperCase()}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleForwardRequest(request._id)}
                        mr={2}
                      >
                        Forward
                      </Button>
                      <Button
                        onClick={() => handleRejectRequest(request._id)}
                        colorScheme="red"
                      >
                        Reject
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>No pending requests found</Text>
          )}
        </Box>
      </Box>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedRequestDetails && (
              <div>
                <p>Description: {selectedRequestDetails.description}</p>
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
      <MyRequests />
    </>
  );
};

export default AdminPage;
