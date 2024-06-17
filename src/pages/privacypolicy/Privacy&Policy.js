import React from "react";
import {
  MdPeople,
  MdDescription,
  MdLibraryBooks,
} from "react-icons/md";
import {
  Grid,
  GridItem, 
  Icon, 
  Flex, 
  Box,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import Navbar from "../navBar";

const PrivacyPolicy = () => {

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
              <Icon as={MdPeople} mr={2} />
              General
            </Flex>
          </GridItem>
          <GridItem w="100%" h="120" bg={colors[1]}>
            <Flex align="center" justify="center" h="100%">
              <Link to="/policy">
                <Icon as={MdDescription} mr={2} />
                HR
              </Link>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="120" bg={colors[2]}>
            <Flex align="center" justify="center" h="100%">
              <Icon as={MdLibraryBooks} mr={2} />
              Finance
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
