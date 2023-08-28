import { Box, Button, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  const logout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  return (
    <Box bg="#3C3C3C" color="white" p={4} display="flex" alignItems="center">
      <Text fontSize="lg">MERN Stack Assignment</Text>
      <Link to="/record-video">Video Recording</Link>
      <Link to="/record-screen">Screen Recording</Link>
      {token && <Button onClick={logout}>Logout</Button>}
    </Box>
  );
};

export default Header;
