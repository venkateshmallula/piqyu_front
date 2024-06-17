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

<<<<<<< HEAD
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
=======
  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(
          "https://piqyu.onrender.com/privacyPolicy"
        );
        if (response.status === 200) {
          setExistingFile("privacyPolicy.pdf");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setExistingFile(null);
        } else {
          console.error("Error fetching file:", error);
        }
      }
    };
    fetchFile();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name); // Set the file name for display
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to upload.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("privacyPolicy", file);

    try {
      const response = await axios.post(
        "https://piqyu.onrender.com/uploadPrivacyPolicy",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded:", response.data);

      toast({
        title: "File Uploaded",
        description: "Privacy policy PDF uploaded successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setFile(null); // Clear the file input after successful upload
      setFileName(""); // Clear the file name
      setExistingFile("privacyPolicy.pdf");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload Error",
        description: "There was an error uploading the file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
>>>>>>> 7c85fa4904767a45a6da21733dbdf7ab713c5d19

  return (
    <>
      <Navbar />
<<<<<<< HEAD
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
=======
      <Box p="5">
        <div>Privacy & Policy</div>
        {Designation === "HR" && (
          <form onSubmit={handleSubmit}>
            <FormControl mt="4">
              <FormLabel htmlFor="file">Upload Privacy Policy (PDF)</FormLabel>
              {file ? (
                <div>{fileName}</div> // Display the selected file name
              ) : (
                <Input type="file" accept=".pdf" onChange={handleFileChange} />
              )}
            </FormControl>
            <Button mt="4" colorScheme="blue" type="submit">
              Upload
            </Button>
          </form>
        )}
        {existingFile && (
          <Box mt="4">
            <a
              href={`https://piqyu.onrender.com/privacyPolicy`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>View Privacy Policy</Button>
            </a>
          </Box>
        )}
>>>>>>> 7c85fa4904767a45a6da21733dbdf7ab713c5d19
      </Box>
    </>
  );
};

export default PrivacyPolicy;
