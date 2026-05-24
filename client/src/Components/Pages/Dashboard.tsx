import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  Flex,
  Button,
} from "@chakra-ui/react";
import ApplicationCard from "../ApplicationCard";
import AddApplicationForm from "../AddApplicationForm";
import StatsBar from "../StatsBar";
import { useAuth } from "../Context/AuthContext";

interface Application {
  _id: string;
  company: string;
  position: string;
  status: string;
  dateApplied: string;
  notes: string;
}

const API = "http://localhost:5000/api/applications";

const FILTERS = ["All", "Applied", "Interview", "Offer", "Rejected"] as const;

const filterStyle: Record<
  string,
  { activeBg: string; inactiveBg: string; activeColor: string; inactiveColor: string }
> = {
  All: {
    activeBg: "#1e293b",
    inactiveBg: "#f1f5f9",
    activeColor: "#ffffff",
    inactiveColor: "#475569",
  },
  Applied: {
    activeBg: "#2563eb",
    inactiveBg: "#eff6ff",
    activeColor: "#ffffff",
    inactiveColor: "#2563eb",
  },
  Interview: {
    activeBg: "#d97706",
    inactiveBg: "#fffbeb",
    activeColor: "#ffffff",
    inactiveColor: "#d97706",
  },
  Offer: {
    activeBg: "#16a34a",
    inactiveBg: "#f0fdf4",
    activeColor: "#ffffff",
    inactiveColor: "#16a34a",
  },
  Rejected: {
    activeBg: "#dc2626",
    inactiveBg: "#fef2f2",
    activeColor: "#ffffff",
    inactiveColor: "#dc2626",
  },
};

const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const { user } = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(API, config);
      setApplications(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (form: Omit<Application, "_id" | "dateApplied">) => {
    try {
      const res = await axios.post(API, form, config);
      setApplications([...applications, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API}/${id}`, config);
      setApplications(applications.filter((app) => app._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string, status: string) => {
    try {
      const res = await axios.put(`${API}/${id}`, { status }, config);
      setApplications(
        applications.map((app) => (app._id === id ? res.data : app))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredApplications =
    filter === "All"
      ? applications
      : applications.filter((app) => app.status === filter);

  useEffect(() => {
    fetchApplications();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Gradient hero header */}
      <Box
        style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)" }}
        px={{ base: 4, md: 8 }}
        pt={10}
        pb={24}
      >
        <Box maxW="1280px" mx="auto">
          <Text color="blue.200" fontSize="sm" mb={2} fontWeight="medium">
            {today}
          </Text>
          <Heading
            color="white"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            mb={1}
          >
            Welcome back, {firstName} 👋
          </Heading>
          <Text color="blue.100" fontSize="sm">
            Here's a summary of your job search progress.
          </Text>
        </Box>
      </Box>

      {/* Content overlapping the hero */}
      <Box maxW="1280px" mx="auto" px={{ base: 4, md: 8 }} mt={-16} position="relative">
        <StatsBar applications={applications} />

        <AddApplicationForm onAdd={handleAdd} />

        {/* Filter pills */}
        <Flex gap={2} mb={6} flexWrap="wrap" alignItems="center">
          {FILTERS.map((status) => {
            const isActive = filter === status;
            const fs = filterStyle[status];
            const count =
              status === "All"
                ? applications.length
                : applications.filter((a) => a.status === status).length;
            return (
              <Button
                key={status}
                size="sm"
                style={{
                  background: isActive ? fs.activeBg : fs.inactiveBg,
                  color: isActive ? fs.activeColor : fs.inactiveColor,
                  borderRadius: "9999px",
                  fontWeight: isActive ? 600 : 500,
                  transition: "all 0.15s",
                }}
                _hover={{ opacity: 0.85 }}
                onClick={() => setFilter(status)}
              >
                {status}
                <Text as="span" ml={1} opacity={0.7} fontSize="xs">
                  ({count})
                </Text>
              </Button>
            );
          })}
        </Flex>

        {/* Cards / states */}
        {loading ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            direction="column"
            gap={4}
            py={20}
          >
            <Spinner size="xl" color="blue.500" />
            <Text color="gray.400" fontSize="sm">
              Loading your applications...
            </Text>
          </Flex>
        ) : applications.length === 0 ? (
          <Box
            textAlign="center"
            py={20}
            bg="white"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="gray.100"
            shadow="sm"
            mb={8}
          >
            <Text fontSize="4xl" mb={4}>
              📋
            </Text>
            <Text fontWeight="semibold" fontSize="lg" color="gray.700" mb={2}>
              No applications yet
            </Text>
            <Text color="gray.400" fontSize="sm">
              Add your first job application using the form above.
            </Text>
          </Box>
        ) : filteredApplications.length === 0 ? (
          <Box
            textAlign="center"
            py={16}
            bg="white"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="gray.100"
            shadow="sm"
            mb={8}
          >
            <Text fontSize="3xl" mb={3}>
              🔍
            </Text>
            <Text fontWeight="semibold" color="gray.700" mb={1}>
              No {filter} applications
            </Text>
            <Text color="gray.400" fontSize="sm">
              Try a different filter.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5} pb={12}>
            {filteredApplications.map((app) => (
              <ApplicationCard
                key={app._id}
                application={app}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
