import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="gray.50"
    >
      <Heading fontSize="4xl" mb={4}>
        Welcome to ApplyIQ
      </Heading>
      <Text fontSize="xl" color="gray.600" mb={4}>
        Track your Job Application Smartly
      </Text>
      <Button
        colorScheme="blue"
        size="lg"
        onClick={() => navigate("/dashboard")}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default Landing;
