import Form from "./Form";
import { Button, Container, Stack } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const validateFields = () => {
    if (!email || !password) {
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

    return true;
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    setLoading(true);
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        data
      );
      toast({
        title: "Logged In.",
        description: "You're successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("jwtToken", response.data.token);
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
        <Form label="Email" type="email" value={email} onChange={setEmail} />
        <Form
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <br />
        <Stack direction="column" spacing={4}>
          <Button
            isLoading={loading}
            type="submit"
            colorScheme="teal"
            variant="outline"
          >
            Login
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;
