import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Components/Context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      login(res.data);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="gray.50"
    >
      <Box
        p={8}
        bg="white"
        borderRadius="lg"
        shadow="md"
        borderWidth="1px"
        w={{ base: "90%", md: "400px" }}
      >
        <Heading fontSize="2xl" mb={2} textAlign="center">
          Create Account
        </Heading>
        <Text color="gray.500" textAlign="center" mb={6}>
          Start tracking your applications
        </Text>

        {error && (
          <Box
            bg="red.50"
            color="red.500"
            p={3}
            borderRadius="md"
            mb={4}
            fontSize="sm"
          >
            {error}
          </Box>
        )}

        <Stack gap={4}>
          <Input
            placeholder="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            loading={loading}
            loadingText="Creating account..."
          >
            Register
          </Button>
          <Text textAlign="center" fontSize="sm" color="gray.500">
            Already have an account?{" "}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </Text>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;