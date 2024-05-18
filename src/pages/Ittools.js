import React from "react";
import Navbar from "./navBar";
import { Text, Button, VStack } from "@chakra-ui/react";

const ITToolsList = () => {
  // Define an array of IT tools
  const itTools = ["Rider Revenue and Profit Calculation"];

  return (
    <div>
      <Navbar />
      <Text fontSize="xxx-large" fontFamily="sans-serif" marginBottom="20px">
        List of IT Tools
      </Text>
      <VStack spacing={4}>
        {/* Map over the array of tools and render each tool as a button */}
        {itTools.map((tool, index) => (
          <Button
            as="a"
            key={index}
            href="https://exelinfo-c7gvtgyqw4lvywbkivkrrs.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            colorScheme="teal"
            variant="solid"
            width="300px"
          >
            {tool}
          </Button>
        ))}
      </VStack>
    </div>
  );
};

export default ITToolsList;
