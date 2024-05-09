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
import React from "react";

const Navbar = () => {
  let history = useHistory();
  const toast = useToast();

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

  return (
    <Flex as="nav"  alignItems="center">
      <Heading as="h1"paddingLeft="10">PIQYU WORKFLOW</Heading>
      <Spacer />
      <HStack>
        <Box bg="gray.200" p="10px"></Box>
        <Text>{localStorage.getItem("email")}</Text>
        <Button colorScheme="red" mr="10" onClick={handleLogout}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
