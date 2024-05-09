import {
  Text,
  Table,
  Thead,
  TableContainer,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./mreq.css";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/myrequests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    // Fetch requests initially
    fetchRequests();

    // Fetch requests every 3 seconds (3000 milliseconds)
    const intervalId = setInterval(fetchRequests, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      
      <Text fontSize="x-large" fontFamily="cursive" marginBottom="20px">
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
              {requests.map((request, index) => (
                <Tr key={index}>
                  <Td>{request.requester}</Td>
                  <Td>{request.category}</Td>
                  <Td>{request.description}</Td>
                  <Td>{request.priceQuotation}</Td>
                  <Td>{request.quantity}</Td>
                  <Td>{request.price}</Td>
                  <Td>{request.Approver1}</Td>
                  <Td>{request.Approver2}</Td>
                  <Td>{request.Approver3}</Td>
                  <Td>{request.FinanceApproval}</Td>
                  <Td>{request.status}</Td>
                  <Td>{request.rejected_message}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default MyRequests;
