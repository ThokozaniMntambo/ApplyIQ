import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react";

const BriefcaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const MicIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const XCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

interface Application {
  _id: string;
  status: string;
}

interface Props {
  applications: Application[];
}

const StatsBar = ({ applications }: Props) => {
  const total = applications.length;
  const applied = applications.filter((a) => a.status === "Applied").length;
  const interviews = applications.filter((a) => a.status === "Interview").length;
  const offers = applications.filter((a) => a.status === "Offer").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;

  const stats = [
    {
      label: "Total",
      value: total,
      icon: <BriefcaseIcon />,
      iconBg: "#eff6ff",
      iconColor: "#2563eb",
      accent: "#2563eb",
    },
    {
      label: "Applied",
      value: applied,
      icon: <SendIcon />,
      iconBg: "#eef2ff",
      iconColor: "#4f46e5",
      accent: "#4f46e5",
    },
    {
      label: "Interviews",
      value: interviews,
      icon: <MicIcon />,
      iconBg: "#fffbeb",
      iconColor: "#d97706",
      accent: "#d97706",
    },
    {
      label: "Offers",
      value: offers,
      icon: <StarIcon />,
      iconBg: "#f0fdf4",
      iconColor: "#16a34a",
      accent: "#16a34a",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: <XCircleIcon />,
      iconBg: "#fef2f2",
      iconColor: "#dc2626",
      accent: "#dc2626",
    },
  ];

  return (
    <SimpleGrid columns={{ base: 2, md: 5 }} gap={4} mb={6}>
      {stats.map((stat) => (
        <Box
          key={stat.label}
          bg="white"
          borderRadius="xl"
          shadow="md"
          borderWidth="1px"
          borderColor="gray.100"
          overflow="hidden"
          _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          <Box h="3px" style={{ background: stat.accent }} />
          <Box p={4}>
            <Flex
              w="38px"
              h="38px"
              borderRadius="lg"
              style={{ background: stat.iconBg, color: stat.iconColor }}
              alignItems="center"
              justifyContent="center"
              mb={3}
            >
              {stat.icon}
            </Flex>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="gray.800"
              lineHeight="1"
              mb={1}
            >
              {stat.value}
            </Text>
            <Text
              fontSize="xs"
              color="gray.500"
              fontWeight="medium"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              {stat.label}
            </Text>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default StatsBar;
