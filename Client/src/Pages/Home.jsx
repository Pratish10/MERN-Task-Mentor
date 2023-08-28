import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Login from "../Components/Login";
import Register from "../Components/Register";
import { Link } from "react-router-dom";
import React from "react";

const Home = () => {
  const token = localStorage.getItem("jwtToken");
  return (
    <div style={{ paddingTop: "50px" }}>
      {!token ? (
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Register</Tab>
            <Tab>Login</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Register />
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>You are logged In!</AlertTitle>
          <AlertDescription>
            Visit <Link to="/record-video">Video </Link>Page or
            <Link to="record-screen"> Screen Record</Link> Page.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Home;
