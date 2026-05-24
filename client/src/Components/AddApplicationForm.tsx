import {
  Box,
  Button,
  Input,
  Textarea,
  Stack,
  Text,
  SimpleGrid,
  Flex,
  chakra,
} from "@chakra-ui/react";
import { useState } from "react";

const StyledSelect = chakra.select;

interface NewApplication {
  company: string;
  position: string;
  status: string;
  notes: string;
}

interface Props {
  onAdd: (application: NewApplication) => void;
}

const focusRing = "0 0 0 2px #3b82f6";

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const FieldLabel = ({ children, optional }: { children: React.ReactNode; optional?: boolean }) => (
  <Text
    as="label"
    fontSize="sm"
    fontWeight="medium"
    color="gray.700"
    display="block"
    mb={1.5}
  >
    {children}
    {optional && (
      <Text as="span" color="gray.400" fontWeight="normal" ml={1} fontSize="xs">
        (optional)
      </Text>
    )}
  </Text>
);

const AddApplicationForm = ({ onAdd }: Props) => {
  const [form, setForm] = useState<NewApplication>({
    company: "",
    position: "",
    status: "Applied",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.company || !form.position) return;
    onAdd(form);
    setForm({ company: "", position: "", status: "Applied", notes: "" });
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      shadow="sm"
      mb={6}
      borderWidth="1px"
      borderColor="gray.100"
      overflow="hidden"
    >
      {/* Form header */}
      <Flex
        alignItems="center"
        gap={3}
        px={6}
        py={4}
        borderBottomWidth="1px"
        borderColor="gray.100"
        bg="gray.50"
      >
        <Flex
          w="32px"
          h="32px"
          borderRadius="lg"
          style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
          alignItems="center"
          justifyContent="center"
          color="white"
          flexShrink={0}
        >
          <PlusIcon />
        </Flex>
        <Box>
          <Text fontWeight="semibold" color="gray.800" fontSize="sm">
            Add New Application
          </Text>
          <Text fontSize="xs" color="gray.400">
            Log a job you've applied to
          </Text>
        </Box>
      </Flex>

      {/* Form body */}
      <Box px={6} py={5}>
        <Stack gap={4}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <Box>
              <FieldLabel>Company</FieldLabel>
              <Input
                placeholder="e.g. Google"
                name="company"
                value={form.company}
                onChange={handleChange}
                borderRadius="lg"
                borderColor="gray.200"
                fontSize="sm"
                _focus={{ borderColor: "blue.500", boxShadow: focusRing }}
              />
            </Box>
            <Box>
              <FieldLabel>Position</FieldLabel>
              <Input
                placeholder="e.g. Frontend Engineer"
                name="position"
                value={form.position}
                onChange={handleChange}
                borderRadius="lg"
                borderColor="gray.200"
                fontSize="sm"
                _focus={{ borderColor: "blue.500", boxShadow: focusRing }}
              />
            </Box>
          </SimpleGrid>

          <Box>
            <FieldLabel>Status</FieldLabel>
            <StyledSelect
              name="status"
              value={form.status}
              onChange={handleChange}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              px={3}
              py="10px"
              w="full"
              bg="white"
              color="gray.700"
              fontSize="sm"
              _focus={{ borderColor: "blue.500", outline: "none", boxShadow: focusRing }}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </StyledSelect>
          </Box>

          <Box>
            <FieldLabel optional>Notes</FieldLabel>
            <Textarea
              placeholder="Any additional notes about this application..."
              name="notes"
              value={form.notes}
              onChange={handleChange}
              borderRadius="lg"
              borderColor="gray.200"
              fontSize="sm"
              rows={3}
              resize="vertical"
              _focus={{ borderColor: "blue.500", boxShadow: focusRing }}
            />
          </Box>

          <Button
            style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
            color="white"
            _hover={{ opacity: 0.9, transform: "translateY(-1px)", shadow: "md" }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed", transform: "none" }}
            transition="all 0.2s"
            borderRadius="lg"
            fontWeight="semibold"
            py={6}
            onClick={handleSubmit}
            disabled={!form.company || !form.position}
          >
            <Flex alignItems="center" gap={2}>
              <PlusIcon />
              Add Application
            </Flex>
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddApplicationForm;
