import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <Box
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.100"
      px={{ base: 4, md: 8 }}
      py={4}
      position="sticky"
      top={0}
      zIndex={100}
      shadow="sm"
    >
      <Flex justifyContent="space-between" alignItems="center" maxW="1280px" mx="auto">
        {/* Logo */}
        <Flex
          alignItems="center"
          gap={2}
          cursor="pointer"
          onClick={() => navigate("/")}
          userSelect="none"
        >
          <Flex
            w="34px"
            h="34px"
            borderRadius="lg"
            style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Text color="white" fontWeight="bold" fontSize="sm" lineHeight="1">
              A
            </Text>
          </Flex>
          <Text
            fontWeight="bold"
            fontSize="xl"
            style={{
              background: "linear-gradient(90deg, #2563eb, #4f46e5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ApplyIQ
          </Text>
        </Flex>

        {/* Right side */}
        <Flex gap={3} alignItems="center">
          {user ? (
            <>
              <Flex alignItems="center" gap={2}>
                <Flex
                  w="32px"
                  h="32px"
                  borderRadius="full"
                  bg="blue.50"
                  color="blue.600"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                  fontSize="sm"
                  flexShrink={0}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Flex>
                <Text
                  fontSize="sm"
                  color="gray.700"
                  fontWeight="medium"
                  display={{ base: "none", md: "block" }}
                >
                  {user.name}
                </Text>
              </Flex>
              <Button
                size="sm"
                variant="ghost"
                color="gray.600"
                _hover={{ bg: "gray.100" }}
                borderRadius="lg"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                size="sm"
                style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
                color="white"
                _hover={{ opacity: 0.88 }}
                borderRadius="lg"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                color="gray.600"
                _hover={{ bg: "gray.100" }}
                borderRadius="lg"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                size="sm"
                style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
                color="white"
                _hover={{ opacity: 0.88 }}
                borderRadius="lg"
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
