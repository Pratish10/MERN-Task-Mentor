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
    <Box
      bg="#3C3C3C"
      color="white"
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontSize="lg">MERN Stack Assignment</Text>
      <div>
        <Link to="/record-video">Video Recording</Link>
      </div>
      <div>
        <Link to="/record-screen">Screen Recording</Link>
      </div>
      {token && <Button onClick={logout}>Logout</Button>}
      <div></div>
    </Box>
  );
};

export default Header;
