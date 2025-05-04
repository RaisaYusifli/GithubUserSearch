import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMessage } from '../../shared/hooks/useMessage';
import { useGithubStore } from '../../shared/store/useGithubStore';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const { errorToast } = useMessage();
  const { setLastSearchedUser, lastSearchedUser } = useGithubStore();

  const [username, setUsername] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');

  const handleSearch = () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setIsError(true);
      errorToast();
      return;
    }

    setIsError(false);
    setLastSearchedUser(trimmedUsername);
    navigate(`/user/${trimmedUsername}`);
  };

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.md">
        <VStack spacing={8} align="center" justify="center" minH="70vh">
          <Heading as="h1" size="xl" textAlign="center">
            GitHub User Search
          </Heading>

          <Box w="100%" p={8} bg={cardBgColor} borderRadius="lg" boxShadow="md">
            <VStack spacing={6}>
              <Text fontSize="lg" textAlign="center">
                Enter a GitHub username to view their profile and repositories
              </Text>

              <FormControl isInvalid={isError}>
                <Flex>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    size="lg"
                    borderRightRadius={0}
                  />
                  <Button onClick={handleSearch} colorScheme="blue" size="lg" borderLeftRadius={0}>
                    Search
                  </Button>
                </Flex>
                {isError && <FormErrorMessage>Username is required</FormErrorMessage>}
              </FormControl>

              {lastSearchedUser && (
                <Text fontSize="sm" color="gray.500">
                  Last searched: {lastSearchedUser}
                </Text>
              )}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Search;
