import React, { useState, useEffect } from "react";
import {
  Button,
  useToast,
  FormControl,
  VStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Textarea } from "@chakra-ui/react";

const DrawerExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [requestDetails, setRequestDetails] = useState("");
  const [priceQuotation, setPriceQuotation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [adminOptions, setAdminOptions] = useState([]);
  const [approver, setApprover] = useState("");
  const [observer, setObserver] = useState("");

  const toast = useToast();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admins");
        const currentUser = localStorage.getItem("username");
        const filteredAdmins = response.data.filter(
          (admin) => admin.name !== "Finance team" && admin.name !== currentUser
        );
        console.log("Filtered Admins:", filteredAdmins);
        setAdminOptions(filteredAdmins.map((admin) => admin.name));
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("requestDetails", requestDetails);
    formData.append("priceQuotation", priceQuotation);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("requester", localStorage.getItem("username"));
    formData.append("approver", approver);
    formData.append("observer", observer);

    try {
      const response = await axios.post(
        "http://localhost:5000/postrequest",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Form submitted. Response:", response.data);

      setRequestDetails("");
      setPriceQuotation("");
      setQuantity("");
      setCategory("");
      setPrice("");
      setApprover("");
      setObserver("");

      toast({
        title: "Request Submitted",
        description: "Your request has been submitted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      toggleDrawer();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={toggleDrawer}>
        Send a Request
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={toggleDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Send a request</DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Select category"
                    colorScheme="blue"
                  >
                    <option value="HR">HR</option>
                    <option value="Admin">Admin</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                    <option value="BA">BA</option>
                    <option value="EV">EV</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Request Description</FormLabel>
                  <Textarea
                    value={requestDetails}
                    onChange={(e) => setRequestDetails(e.target.value)}
                    placeholder="Enter request details"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Attach file(PDF)</FormLabel>
                  <Input
                    type="file"
                    onChange={(e) => setPriceQuotation(e.target.files[0])}
                    accept=".pdf"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter Price"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Approver</FormLabel>
                  <Select
                    value={approver}
                    onChange={(e) => setApprover(e.target.value)}
                    placeholder="Select approver"
                    colorScheme="blue"
                  >
                    {adminOptions.map((admin, index) => (
                      <option key={index} value={admin}>
                        {admin.toUpperCase()}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Observer</FormLabel>
                  <Select
                    value={observer}
                    onChange={(e) => setObserver(e.target.value)}
                    placeholder="Select observer"
                    colorScheme="blue"
                  >
                    {adminOptions.map((admin, index) => (
                      <option key={index} value={admin}>
                        {admin.toUpperCase()}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </VStack>
            </form>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={toggleDrawer}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerExample;
