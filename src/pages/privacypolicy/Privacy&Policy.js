import React, { useEffect, useState } from "react";
import { MdPeople, MdDescription, MdLibraryBooks } from "react-icons/md";
import {
  Grid,
  GridItem,
  Icon,
  Flex,
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../navBar";
import { Link } from "react-router-dom";
import "./policy.css";

const PrivacyPolicy = () => {
  const [isHR, setIsHR] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [existingFile, setExistingFile] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const designation = localStorage.getItem("Designation");
    if (designation === "HR") {
      setIsHR(true);
    }

    const fetchFile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/privacyPolicies"
        );
        if (response.status === 200) {
          setExistingFile(response.data.files);
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
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/uploadPrivacyPolicy",
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
      setExistingFile([...existingFile, fileName]); // Update the existing files list
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

  const handleFileClick = (fileName) => {
    window.open(`http://localhost:5000/privacyPolicies/${fileName}`, "_blank");
  };

  return (
    <>
      <Navbar />
      <Box p="5">
        <div>Privacy & Policy</div>
        {isHR && (
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
            {existingFile.map((fileName, index) => (
              <Button key={index} onClick={() => handleFileClick(fileName)}>
                {fileName}
              </Button>
            ))}
          </Box>
        )}
      </Box>
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
