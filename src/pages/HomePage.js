import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../Components/Authentication/Login";
import SignUp from "../Components/Authentication/Hostlogin";

function Homepage() {
  return (
    <Container maxW="xl" centerContent>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        textAlign="center"
        mt={10} // Center text horizontally
        mb={0} // Add margin for spacing
      >
        <Text fontSize="4xl" fontFamily="Work sans" fontStyle="bold">
          PIQYU SmartFlow
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs
          alignItems="center"
          variant="soft-rounded"
          colorScheme="green"
          isCentered
        >
          <TabList mb="1em">
            <Tab width="50%">User Login</Tab>
            <Tab width="50%">Host Login</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>
                <Login />
              </p>
            </TabPanel>
            <TabPanel>
              <p>
              <SignUp/>
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
