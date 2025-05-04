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
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMessage } from '../../shared/hooks/useMessage';
import { useGithubStore } from '../../shared/store/useGithubStore';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);
const MotionVStack = motion(VStack);

const Search: React.FC = () => {
  const navigate = useNavigate();
  const { errorToast } = useMessage();
  const { setLastSearchedUser, lastSearchedUser } = useGithubStore();

  const [username, setUsername] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');

  const handleSearch = () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setIsError(true);
      errorToast();
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      setIsError(false);
      setLastSearchedUser(trimmedUsername);
      setIsSearching(false);
      navigate(`/user/${trimmedUsername}`);
    }, 600);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.md">
        <MotionVStack
          spacing={8}
          align="center"
          justify="center"
          minH="70vh"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <MotionHeading as="h1" size="xl" textAlign="center" variants={itemVariants}>
            GitHub User Search
          </MotionHeading>

          <MotionBox
            w="100%"
            p={8}
            bg={cardBgColor}
            borderRadius="lg"
            boxShadow="md"
            variants={itemVariants}
            whileHover={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
            transition={{ duration: 0.3 }}
          >
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
                    _focus={{
                      borderColor: 'blue.300',
                      boxShadow: '0 0 0 1px blue.300'
                    }}
                    transition="all 0.3s"
                  />
                  <MotionButton
                    onClick={handleSearch}
                    colorScheme="blue"
                    size="lg"
                    borderLeftRadius={0}
                    isLoading={isSearching}
                    loadingText="Searching"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Search
                  </MotionButton>
                </Flex>
                {isError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FormErrorMessage>Username is required</FormErrorMessage>
                  </motion.div>
                )}
              </FormControl>

              {lastSearchedUser && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <Text fontSize="sm" color="gray.500">
                    Last searched: {lastSearchedUser}
                  </Text>
                </motion.div>
              )}
            </VStack>
          </MotionBox>
        </MotionVStack>
      </Container>
    </Box>
  );
};

export default Search;
