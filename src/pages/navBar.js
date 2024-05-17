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
import { FaUser } from "react-icons/fa"; // Importing the user icon

const Navbar = () => {
  let history = useHistory();
  const toast = useToast();
  const [showDetails, setShowDetails] = useState(false);

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

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleHomeClick = () => {
    // Redirect to the home page
    history.push("/home");
  };

  return (
    <Flex as="nav" alignItems="center" height="60px" backgroundColor="#dfdfe6">
      <Heading as="h3" paddingLeft="10" color="blueviolet">
        PIQYU SMARTFLOW
      </Heading>
      <Spacer />
      <HStack>
        <Box onClick={toggleDetails} cursor="pointer" paddingRight="15px">
          <FaUser size={20} /> {/* Using the user icon */}
        </Box>
        {showDetails && (
          <Box>
            <Text fontWeight="bold">
              Name:{" "}
              <Text as="span" fontWeight="normal">
                {localStorage.getItem("username")}
              </Text>
            </Text>
            <Text fontWeight="bold">
              Designation:{" "}
              <Text as="span" fontWeight="normal">
                {localStorage.getItem("Designation")}
              </Text>
            </Text>
          </Box>
        )}
        <Button variant="ghost" colorScheme="cyan" onClick={handleHomeClick}>
          Home
        </Button>
        <Button
          variant="ghost"
          colorScheme="red"
          mr="10"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
