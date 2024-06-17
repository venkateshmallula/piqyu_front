import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../navBar";
import "./policy.css";

function FileIcon(props) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function FileGrid() {
  const [isHR, setIsHR] = useState(false);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState("");
  const toast = useToast();

  useEffect(() => {
    // Retrieve the designation from local storage
    const designation = localStorage.getItem("Designation");
    if (designation === "HR") {
      setIsHR(true);
    }

    // Fetch files from API
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/privacyPolicies");
      setFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast({
        title: "Fetch Error",
        description: "Failed to fetch privacy policy files.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
        description: "File uploaded successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setFile(""); // Clear the file input after successful upload
      fetchFiles(); // Refresh files after upload
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
    // Implement logic to open or download the file here
    console.log("Clicked on file:", fileName);
    // Example: You can open a new tab with the file URL for download
    window.open(`http://localhost:5000/privacyPolicies/${fileName}`, "_blank");
  };

  return (
    <>
      <Navbar />
      {isHR && (
        <Box mt="4">
          <form onSubmit={handleSubmit}>
            <FormControl mt="4">
              <FormLabel htmlFor="file">Upload File (PDF)</FormLabel>
              <Input
                type="file"
                id="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </FormControl>
            <Button mt="4" colorScheme="blue" type="submit">
              Upload
            </Button>
          </form>
        </Box>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {files.map((fileName, index) => (
          <div className="file_container">
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer"
              onClick={() => handleFileClick(fileName)}
            >
              <div>
                <FileIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="text-center text-sm font-medium truncate">
                {fileName}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FileGrid;
