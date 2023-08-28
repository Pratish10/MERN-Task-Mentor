import { Button, Container, Stack } from "@chakra-ui/react";
import Form from "./Form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const validateFields = () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return false;
    }

    if (password.trim().length < 6) {
      toast({
        title: "Error",
        description: "Password should be at least 6 characters.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return false;
    }

    return true;
  };

  const clearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }
    setLoading(true);

    const data = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        data
      );
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.setItem("jwtToken", response.data.token);
      localStorage.setItem("userId", response.data._id);
      navigate("/record-video");
      clearFields();
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Form label="Name" type="text" value={name} onChange={setName} />
        <Form label="Email" type="email" value={email} onChange={setEmail} />
        <Form
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <Form
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <br />
        <Stack direction="column" spacing={4}>
          <Button
            isLoading={loading}
            type="submit"
            colorScheme="teal"
            variant="outline"
          >
            Register
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Register;
