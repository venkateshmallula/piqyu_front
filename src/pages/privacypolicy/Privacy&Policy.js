import React, { useState, useEffect } from "react";
import {
  useToast,
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../navBar";

const PrivacyPolicy = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState(""); // Track the selected file name
  const [existingFile, setExistingFile] = useState(null); // Track the existing file
  const toast = useToast();
  const Designation = localStorage.getItem("Designation");

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

  return (
    <>
      <Navbar />
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
      </Box>
    </>
  );
};

export default PrivacyPolicy;
