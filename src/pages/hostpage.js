import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Spacer,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import AddUser from "./adduser"; // Import the component for adding a user
import HostHomepage from "./hosthomepage"; // Import the component for the host homepage
import "./hostpage.css";

const Hostpage = () => {
  // State to manage which component to render
  let history = useHistory();
  const toast = useToast();
  const [activeComponent, setActiveComponent] = useState("home");

  // Function to handle component selection
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    // Show toast
    toast({
      title: "Logged out successfully",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });

    // Redirect to the login page
    history.push("/");
  };

  // Function to handle navigation to the home page
  const handleGoToHomepage = () => {
    setActiveComponent("home");
  };

  return (
    <div>
      <Flex as="nav" alignItems="center">
        <Heading as="h1">PIQYU WORKFLOW</Heading>
        <Spacer />
        <HStack>
          <Box bg="gray.200" p="10px"></Box>
          <Text>{localStorage.getItem("email")}</Text>
          <Button onClick={handleGoToHomepage}>Homepage</Button>
          <Button
            colorScheme="blue"
            onClick={() => setActiveComponent("AddUser")}
          >
            Add User
          </Button>
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      </Flex>

      {/* Render the selected component */}
      <div className="component-container">
        {activeComponent === "home" && <HostHomepage />}
        {activeComponent === "AddUser" && <AddUser />}
      </div>
    </div>
  );
};

export default Hostpage;
