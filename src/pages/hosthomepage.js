import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast, // Import useToast hook
} from "@chakra-ui/react";
import "./hosthomepage.css";

const HostHomepage = () => {
  const [users, setUsers] = useState([]);
  const [editableUserId, setEditableUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const toast = useToast(); // Initialize useToast hook

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (userId, userData) => {
    setEditableUserId(userId);
    setUpdatedUserData(userData);
  };

  const handleSave = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/user/${userId}`, updatedUserData);
      setEditableUserId(null);
      setUpdatedUserData({}); // Reset updated user data
      fetchUsers(); // Refresh the user list
      // Show success toast
      toast({
        title: "User data updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating user data:", error);
      // Show error toast
      toast({
        title: "Error updating user data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]: value,
    });
  };

  return (
    <div className="home-container">
      <h1 className="h1_tag">Users</h1>
      <div className="table-container-2">
        <Table variant="simple" colorScheme="grey" className="table">
          <Thead>
            <Tr>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Password</Th>
              <Th>Role</Th>
              <Th>Employee ID</Th>
              <Th>Mobile Number</Th>
              <Th>Location</Th>
              <Th>Designation</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>
                  {editableUserId === user._id ? (
                    <Input
                      name="name"
                      value={updatedUserData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.name
                  )}
                </Td>
                <Td>
                  {editableUserId === user._id ? (
                    <Input
                      name="email"
                      value={updatedUserData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.email
                  )}
                </Td>
                <Td>
                  {editableUserId === user._id ? (
                    <Input
                      name="password"
                      value={updatedUserData.password}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.password.substring(0, 10)
                  )}
                </Td>
                <Td>
                  {editableUserId === user._id ? (
                    <Input
                      name="role"
                      value={updatedUserData.role}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.role
                  )}
                </Td>
                <Td>
                  {editableUserId === user._id ? (
                    <Input
                      name="employee_id"
                      value={updatedUserData.employee_id}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.employee_id
                  )}
                </Td>
                <Td>
                  {editableUserId === user._id ? (
                    <Input
                      name="mobile_number"
                      value={updatedUserData.mobile_number}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.mobile_number
                  )}
                </Td>
                <Td>
                  {editableUserId === user._id ? (
                    <Input
                      name="location"
                      value={updatedUserData.location}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.location
                  )}
                </Td>
                <Td>
                  {editableUserId === user._id ? (
                    <Input
                      name="designation"
                      value={updatedUserData.designation}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.designation
                  )}
                </Td>
                <Td>
                  {editableUserId === user._id ? (
                    <Button
                      colorScheme="green"
                      onClick={() => handleSave(user._id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      colorScheme="blue"
                      onClick={() => handleEdit(user._id, user)}
                    >
                      Edit
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default HostHomepage;
