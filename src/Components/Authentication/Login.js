import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => setShow(!show);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        number,
        password,
      });

      if (response.data.exists) {
        const role = response.data.role;
        const name = response.data.name;
        const email = response.data.email;
        const Designation = response.data.designation;

        // Store username, number, and role in local storage
        localStorage.setItem("username", name);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        localStorage.setItem("Designation", Designation);

        if (
          role === "requester" ||
          role === "admin" ||
          role === "Financeteam" ||
          role === "HR" ||
          role === "telecaller" ||
          role === "host"
        ) {
          history.push("/home"); // Navigate to admin page
        }
        toast({
          title: "Login Successful",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else if (response.data === "Incorrect password") {
        toast({
          title: "Incorrect Password",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else if (response.data === "not found") {
        toast({
          title: "Number Does not Exist",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="number" isRequired>
        <FormLabel>Phone Number</FormLabel>
        <Input
          value={number}
          type="tel"
          placeholder="Enter Your Phone Number"
          onChange={(e) => setNumber(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
