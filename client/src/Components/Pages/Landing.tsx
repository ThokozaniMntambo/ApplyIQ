import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button, SimpleGrid, Flex } from "@chakra-ui/react";

const features = [
  {
    emoji: "📋",
    title: "Track Applications",
    desc: "Keep every job application organized in one clean dashboard.",
  },
  {
    emoji: "📊",
    title: "Monitor Status",
    desc: "See at a glance where you stand — applied, interviewing, or offered.",
  },
  {
    emoji: "🎯",
    title: "Stay Focused",
    desc: "Never miss a follow-up or forget an opportunity again.",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero */}
      <Box
        bg="blue.700"
        minH="72vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={8}
        textAlign="center"
      >
        <Text fontSize="5xl" mb={4} lineHeight="1">
          🎯
        </Text>
        <Heading
          fontSize={{ base: "3xl", md: "5xl" }}
          color="white"
          mb={4}
          letterSpacing="tight"
          lineHeight="1.1"
        >
          Land Your Dream Job
          <br />
          <Text as="span" color="blue.200">
            Smarter & Faster
          </Text>
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="blue.100"
          mb={10}
          maxW="480px"
          lineHeight="relaxed"
        >
          ApplyIQ helps you track every application, monitor interview stages,
          and stay on top of your job search — all in one place.
        </Text>
        <Button
          size="lg"
          bg="white"
          color="blue.700"
          _hover={{
            bg: "blue.50",
            transform: "translateY(-2px)",
            shadow: "lg",
          }}
          transition="all 0.2s"
          fontWeight="bold"
          px={10}
          borderRadius="xl"
          onClick={() => navigate("/dashboard")}
        >
          Get Started Free →
        </Button>
      </Box>

      {/* Features */}
      <Box bg="gray.50" py={20} px={8}>
        <Heading
          textAlign="center"
          fontSize="2xl"
          mb={12}
          color="gray.700"
          fontWeight="semibold"
        >
          Everything you need in your job search
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={8}
          maxW="900px"
          mx="auto"
        >
          {features.map((f) => (
            <Box
              key={f.title}
              bg="white"
              p={8}
              borderRadius="2xl"
              shadow="sm"
              textAlign="center"
              borderWidth="1px"
              borderColor="gray.100"
              _hover={{ shadow: "md", transform: "translateY(-2px)" }}
              transition="all 0.2s"
            >
              <Flex
                w="56px"
                h="56px"
                bg="blue.50"
                borderRadius="xl"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                mb={4}
                fontSize="2xl"
              >
                {f.emoji}
              </Flex>
              <Heading fontSize="md" mb={2} color="gray.800">
                {f.title}
              </Heading>
              <Text color="gray.500" fontSize="sm" lineHeight="relaxed">
                {f.desc}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* CTA Footer */}
      <Box bg="blue.700" py={16} px={8} textAlign="center">
        <Heading fontSize="2xl" color="white" mb={4}>
          Ready to take control of your job search?
        </Heading>
        <Text color="blue.200" mb={8} fontSize="md">
          Join job seekers who landed their dream roles with ApplyIQ.
        </Text>
        <Button
          size="lg"
          bg="white"
          color="blue.700"
          _hover={{ bg: "blue.50", transform: "translateY(-2px)" }}
          transition="all 0.2s"
          fontWeight="bold"
          px={10}
          borderRadius="xl"
          onClick={() => navigate("/dashboard")}
        >
          Start Tracking Now
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;
