import { Grid, GridItem, Icon, Flex, useToast, Box } from "@chakra-ui/react";
import {
  MdPeople,
  MdDescription,
  MdLibraryBooks,
  MdAttachMoney,
  MdSettings,
  MdForum,
  MdNote,
} from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiCalendar } from "react-icons/bi";
import Navbar from "./navBar";

const MyHome = () => {
  const userRole = localStorage.getItem("role");
  const toast = useToast();

  let processRequestLink; // Default link
  let showToast = false; // Flag to determine whether to show toast

  // Update link based on user's role
  if (userRole === "requester") {
    processRequestLink = "/request";
  } else if (userRole === "admin") {
    processRequestLink = "/admin";
  } else if (userRole === "Financeteam") {
    processRequestLink = "/Financeteam";
  } else if (userRole === "host") {
    processRequestLink = "/host";
  } else {
    // If user's role is not specified, set link to default and show toast
    processRequestLink = "/home";
    showToast = true;
  }

  const handleProcessRequestClick = () => {
    // Show toast if the user clicks on "Process Requests" link and their role is not specified
    if (showToast) {
      toast({
        title: "Access Denied",
        description: "You don't have access to this feature.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Array of colors for grid items
  const colors = [
    "blue.500",
    "green.500",
    "purple.500",
    "yellow.500",
    "orange.500",
    "teal.500",
    "pink.500",
    "cyan.500",
    "red.500",
  ];

  return (
    <>
      <Navbar />
      <Box p="30px">
        <Grid templateColumns="repeat(3, 3fr)" gap={2}>
          <GridItem w="100%" h="120" bg={colors[0]}>
            <Flex align="center" justify="center" h="100%">
              <Link to="/employees">
                <Icon as={MdPeople} mr={2} />
                Employee Directory
              </Link>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="120" bg={colors[1]}>
            <Flex align="center" justify="center" h="100%">
              <Link to="/policies">
                <Icon as={MdDescription} mr={2} />
                Policies and Procedures
              </Link>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="120" bg={colors[2]}>
            <Flex align="center" justify="center" h="100%">
              <Icon as={MdLibraryBooks} mr={2} />
              Employee Handbook
            </Flex>
          </GridItem>
          <GridItem w="100%" h="120" bg={colors[3]}>
            <Flex align="center" justify="center" h="100%">
              <Link to="/it-tools">
                <Icon as={FaTools} mr={2} />
                IT Tools
              </Link>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="120" bg={colors[4]}>
            <Flex align="center" justify="center" h="100%">
              <Link to={processRequestLink} onClick={handleProcessRequestClick}>
                <Icon as={MdSettings} mr={2} />
                Process Requests
              </Link>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="120" bg={colors[5]}>
            <Flex align="center" justify="center" h="100%">
              <Icon as={MdLibraryBooks} mr={2} />
              LMS
            </Flex>
          </GridItem>
          <GridItem w="100%" h="120" bg={colors[6]}>
            <Flex align="center" justify="center" h="100%">
              <Link to="/callender">
                <Icon as={BiCalendar} mr={2} />
                Calendar
              </Link>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="120" bg={colors[7]}>
            <Flex align="center" justify="center" h="100%">
              <Icon as={MdForum} mr={2} />
              Message Board
            </Flex>
          </GridItem>
          <GridItem w="100%" h="120" bg={colors[8]}>
            <Flex align="center" justify="center" h="100%">
              <Icon as={MdNote} mr={2} />
              Notes
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default MyHome;
