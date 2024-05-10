import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Text,
  Table,
  Thead,
  TableContainer,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import "./mreq.css";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequestDetails, setSelectedRequestDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
        const response = await axios.get(
          `https://piqyu.onrender.com/myrequests/${storedUsername}`
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();

    const intervalId = setInterval(fetchRequests, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const handleViewDetailsClick = async (description) => {
    setSelectedRequestDetails(description);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequestDetails(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "Rejected":
        return "red";
      case "Approved":
        return "green";
      default:
        return "black"; // Default color
    }
  };

  return (
    <div>
      <Text fontSize="x-large" fontFamily="cursive" marginBottom="20px">
        MY Requests
      </Text>
      <div className="Table_container">
        <TableContainer>
          <Table
            variant="simple"
            size="md"
            className="table"
            borderRadius="15px"
          >
            <Thead>
              <Tr>
                <Th>Sno</Th>
                <Th>Requester</Th>
                <Th>Category</Th>
                <Th>Request Details</Th>
                <Th>Price Quotation</Th>
                <Th>Quantity</Th>
                <Th>Price</Th>
                <Th>Observer</Th>
                <Th>Approver-1</Th>
                <Th>Approver-2</Th>
                <Th>Approver-3</Th>
                <Th>Finance Approval</Th>
                <Th>Status</Th>
                <Th>Reason for Rejection</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.map((request, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{request.requester}</Td>
                  <Td>{request.category}</Td>
                  <Td>
                    <Text
                      cursor="pointer"
                      color="blue"
                      onClick={() =>
                        handleViewDetailsClick(request.description)
                      }
                    >
                      {request.description.substring(0, 10)}...
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
                        {request.priceQuotation}
                      </a>
                    )}
                  </Td>
                  <Td>{request.quantity}</Td>
                  <Td>{request.price}</Td>
                  <Td>{request.observer}</Td>
                  <Td>{request.Approver1}</Td>
                  <Td>{request.Approver2}</Td>
                  <Td>{request.Approver3}</Td>
                  <Td>{request.FinanceApproval}</Td>
                  <Td color={getStatusColor(request.status)}>
                    {request.status}
                  </Td>
                  <Td>{request.rejected_message}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedRequestDetails}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MyRequests;
