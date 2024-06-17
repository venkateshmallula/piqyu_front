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
import ReactPaginate from "react-paginate";
import "./mreq.css";

const Allrequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [requestDetails, setRequestDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(0); // Current page number
  const recordsPerPage = 10; // Number of records per page

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("https://piqyu.onrender.com/allrequests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();

    const intervalId = setInterval(fetchRequests, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchRequestDetails = async (id) => {
    try {
      const response = await axios.get(`https://piqyu.onrender.com/requests/${id}`);
      setRequestDetails(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRequestDetails(null);
    setSelectedRequestId(null);
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

  // Calculate index of the first and last record to display on the current page
  const indexOfLastRecord = (pageNumber + 1) * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = requests.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <Text fontSize="xx-large" fontFamily="sans-serif" marginBottom="20px">
        All Requests
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
                <Th>Requester</Th>
                <Th>Category</Th>
                <Th>Request Details</Th>
                <Th>Price Quotation</Th>
                <Th>Quantity</Th>
                <Th>Price</Th>
                <Th>Approver-1</Th>
                <Th>Approver-2</Th>
                <Th>Approver-3</Th>
                <Th>Finance Approval</Th>
                <Th>Status</Th>
                <Th>Reason for Rejection</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentRecords.map((request, index) => (
                <Tr
                  key={index}
                  className={
                    request.status === "Rejected"
                      ? "rejected-row"
                      : request.status === "Approved"
                      ? "approved-row"
                      : ""
                  }
                >
                  <Td>{request.requester.toUpperCase()}</Td>
                  <Td>{request.category}</Td>
                  <Td>
                    <Text
                      color="blue"
                      textDecoration="underline"
                      cursor="pointer"
                      onClick={() => fetchRequestDetails(request._id)}
                    >
                      {request.description.substring(0, 30)}...{" "}
                      {/* Display first 25 characters */}
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
                  <Td>{request.Approver1.toUpperCase()}</Td>
                  <Td>
                    {request.Approver2
                      ? request.Approver2.toUpperCase()
                      : request.Approver2}
                  </Td>
                  <Td>
                    {request.Approver3
                      ? request.Approver3.toUpperCase()
                      : request.Approver3}
                  </Td>
                  <Td>
                    {request.FinanceApproval
                      ? request.FinanceApproval.toUpperCase()
                      : request.FinanceApproval}
                  </Td>

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
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(requests.length / recordsPerPage)}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
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
    </div>
  );
};

export default Allrequests;
