import { Box, Flex, Heading, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <Box bg="blue.600" px={8} py={4}>
     <Flex justifyContent="space-between" alignItems="center">
        <Heading 
          color="white" 
          fontSize="2xl"
          cursor="pointer"
          onClick={() => navigate('/')}
        >
          ApplyIQ 
        </Heading>
        <Flex gap={4}>
          <Button
            variant="ghost"
            color="white"
            _hover={{ bg: 'blue.700' }}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            bg="white"
            color="blue.600"
            _hover={{ bg: 'gray.100' }}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar