import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
  Button,
  Text,
  Select,
  useToast, // Import useToast hook
} from "@chakra-ui/react";
import "./adminpage.css";
import MyRequests from "./myReuests";
import Navbar from "./navBar";

const AdminPage = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminOptions, setAdminOptions] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState({});
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

  const handleAdminSelectChange = (e, id) => {
    const { value } = e.target;
    setSelectedAdmins((prevSelectedAdmins) => ({
      ...prevSelectedAdmins,
      [id]: value,
    }));
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
        <h1 className="h1-tag">Admin Page - Requests</h1>
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
                  <Th>Forward To</Th>
                  <Th>Forward</Th>{" "}
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
                      <Select
                        placeholder="Select admin"
                        onChange={(e) =>
                          handleAdminSelectChange(e, request._id)
                        }
                        value={selectedAdmins[request._id] || ""}
                      >
                        {adminOptions.map((admin, index) => (
                          <option key={index} value={admin}>
                            {admin}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td>
                      <Button onClick={() => handleForwardRequest(request._id)}>
                        Forward
                      </Button>
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

export default AdminPage;
