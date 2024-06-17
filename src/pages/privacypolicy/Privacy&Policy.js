import React from "react";
import { MdPeople, MdDescription, MdLibraryBooks } from "react-icons/md";
import {
  Grid,
  GridItem,
  Icon,
  Flex,
  Box,
} from "@chakra-ui/react";
import Navbar from "../navBar";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {

  return (
    <>
      <Navbar />
      <Box p="30px">
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          <GridItem w="100%" h="120px" bg="blue.500">
            <Flex align="center" justify="center" h="100%">
              <Icon as={MdPeople} mr={2} />
              General
            </Flex>
          </GridItem>
          <GridItem w="100%" h="120px" bg="green.500">
            <Flex align="center" justify="center" h="100%">
              <Link to="/policy">
                <Icon as={MdDescription} mr={2} />
                HR
              </Link>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="120px" bg="purple.500">
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
