import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  let history = useHistory();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://piqyu.onrender.com/login", {
        number,
        password,
      });
      if (response.data.exists) {
        console.log(response.data);
        // Set user data in local storage
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("Designation", response.data.designation);
        // Redirect based on role
        if (response.data.role === "host") {
          history.push("/hostpage");
          toast({
            title: "Login Successful",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
        else if(response.data.role !== "host"){
          toast({
            title: "You are not Host",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setNumber("");
          setPassword("");
        }
      } else if (response.data === "Incorrect password") {
        // Handle incorrect password
        toast({
          title: "Incorrect Password",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else if (response.data === "not found") {
        // Handle user not found
        toast({
          title: "Number Does not Exist",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      else{
        toast({
          title: "You are not host",
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
