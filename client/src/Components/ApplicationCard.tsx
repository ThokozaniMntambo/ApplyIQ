import { useState } from "react";
import { Box, Text, Flex, Button, chakra } from "@chakra-ui/react";

interface Application {
  _id: string;
  company: string;
  position: string;
  status: string;
  dateApplied: string;
  notes: string;
}

interface Props {
  application: Application;
  onDelete: (id: string) => void;
  onUpdate: (id: string, status: string) => void;
}

const statusConfig: Record<
  string,
  {
    borderColor: string;
    avatarColor: string;
    badgeBg: string;
    badgeColor: string;
    headerGradient: string;
  }
> = {
  Applied: {
    borderColor: "#3b82f6",
    avatarColor: "#2563eb",
    badgeBg: "#dbeafe",
    badgeColor: "#1d4ed8",
    headerGradient: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
  },
  Interview: {
    borderColor: "#f59e0b",
    avatarColor: "#b45309",
    badgeBg: "#fef3c7",
    badgeColor: "#92400e",
    headerGradient: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
  },
  Offer: {
    borderColor: "#22c55e",
    avatarColor: "#15803d",
    badgeBg: "#dcfce7",
    badgeColor: "#166534",
    headerGradient: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
  },
  Rejected: {
    borderColor: "#ef4444",
    avatarColor: "#dc2626",
    badgeBg: "#fee2e2",
    badgeColor: "#991b1b",
    headerGradient: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
  },
};

const defaultConfig = {
  borderColor: "#d1d5db",
  avatarColor: "#4b5563",
  badgeBg: "#f3f4f6",
  badgeColor: "#374151",
  headerGradient: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
};

const StyledSelect = chakra.select;

const ApplicationCard = ({ application, onDelete, onUpdate }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState(application.status);
  const config = statusConfig[selectedStatus] ?? defaultConfig;
  const initial = application.company.charAt(0).toUpperCase();

  return (
    <Box
      bg="white"
      borderRadius="xl"
      shadow="sm"
      borderWidth="1px"
      borderColor="gray.100"
      borderLeftWidth="4px"
      style={{ borderLeftColor: config.borderColor }}
      overflow="hidden"
      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
      transition="all 0.2s"
    >
      {/* Header with status-tinted gradient background */}
      <Box style={{ background: config.headerGradient }} px={5} pt={5} pb={4}>
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Flex alignItems="center" gap={3} flex={1} minW={0}>
            <Flex
              w="44px"
              h="44px"
              borderRadius="xl"
              bg="white"
              style={{ color: config.avatarColor }}
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              fontSize="lg"
              flexShrink={0}
              shadow="sm"
            >
              {initial}
            </Flex>
            <Box minW={0}>
              <Text
                fontWeight="bold"
                fontSize="md"
                color="gray.800"
                lineHeight="tight"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {application.company}
              </Text>
              <Text
                color="gray.500"
                fontSize="sm"
                mt={0.5}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {application.position}
              </Text>
            </Box>
          </Flex>
          <Box
            px={3}
            py={1}
            borderRadius="full"
            style={{ background: config.badgeBg, color: config.badgeColor }}
            fontSize="xs"
            fontWeight="semibold"
            flexShrink={0}
            ml={2}
          >
            {selectedStatus}
          </Box>
        </Flex>
      </Box>

      {/* Body */}
      <Box px={5} py={3}>
        <Flex alignItems="center" gap={1} mb={application.notes ? 3 : 0}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <Text color="gray.400" fontSize="xs">
            {new Date(application.dateApplied).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </Flex>

        {application.notes && (
          <Box
            bg="gray.50"
            borderRadius="lg"
            p={3}
            borderLeftWidth="3px"
            borderLeftColor="gray.200"
          >
            <Text color="gray.500" fontSize="xs" lineHeight="relaxed">
              {application.notes}
            </Text>
          </Box>
        )}
      </Box>

      {/* Action bar */}
      <Box borderTopWidth="1px" borderColor="gray.100" px={5} py={3} bg="gray.50">
        <Flex gap={2} alignItems="center">
          <StyledSelect
            value={selectedStatus}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedStatus(e.target.value)
            }
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            fontSize="xs"
            py="6px"
            px={2}
            bg="white"
            color="gray.700"
            cursor="pointer"
            _hover={{ borderColor: "blue.400" }}
            transition="border-color 0.2s"
            flex={1}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </StyledSelect>
          <Button
            size="xs"
            variant="ghost"
            color="blue.500"
            _hover={{ bg: "blue.50", color: "blue.700" }}
            onClick={() => onUpdate(application._id, selectedStatus)}
            px={3}
            flexShrink={0}
            disabled={selectedStatus === application.status}
          >
            Save
          </Button>
          <Button
            size="xs"
            variant="ghost"
            color="red.400"
            _hover={{ bg: "red.50", color: "red.600" }}
            onClick={() => onDelete(application._id)}
            px={3}
            flexShrink={0}
          >
            Delete
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ApplicationCard;
