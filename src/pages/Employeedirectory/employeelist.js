import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import Navbar from '../navBar';

const Employeelist = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://piqyu.onrender.com/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box color="red">{error}</Box>;
  }

  return (
    <>
      <Navbar />
      <Box p="4">
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Employee ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Mobile Number</Th>
                <Th>Location</Th>
                <Th>Designation</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user.employee_id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.mobile_number}</Td>
                  <Td>{user.location}</Td>
                  <Td>{user.designation}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Employeelist;
