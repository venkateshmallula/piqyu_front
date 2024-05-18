import React, { useState } from "react";
import {
    Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import "./adduser.css";

const AddUser = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    employeeId: "",
    mobileNumber: "",
    location: "",
    designation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const showToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/adduser",
        formData
      );
      console.log("Form submitted. Response:", response.data);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "",
        employeeId: "",
        mobileNumber: "",
        location: "",
        designation: "",
      });
      showToast({ title: "User added successfully", status: "success" });
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast({ title: "Error adding user", status: "error" });
    }
  };

  return (
    <div className="body">
      <Text fontSize="3xl" fontFamily="cursive">Add User</Text>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-tags">
          <FormControl isRequired>
            <FormLabel>Full name</FormLabel>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Select Role"
            >
              <option value="admin">Admin</option>
              <option value="requester">Requester</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Employee ID</FormLabel>
            <Input
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter Employee ID"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Mobile Number</FormLabel>
            <Input
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter Location"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Designation</FormLabel>
            <Input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter Designation"
            />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Add User
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
