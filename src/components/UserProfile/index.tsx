import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Skeleton,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import React from 'react';

import { GithubUser } from '../../shared/store/useGithubStore';

interface UserProfileProps {
  user: GithubUser;
  isLoading: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, isLoading }) => {
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (isLoading) {
    return (
      <Box p={6} bg={cardBgColor} borderRadius="lg" boxShadow="md" w="100%">
        <Stack spacing={4}>
          <Flex direction={{ base: 'column', md: 'row' }} align="start">
            <Skeleton height="150px" width="150px" borderRadius="full" />
            <VStack align="start" spacing={4} flex={1} mt={{ base: 4, md: 0 }}>
              <Skeleton height="30px" width="200px" />
              <Skeleton height="20px" width="180px" />
              <Skeleton height="20px" width="250px" />
            </VStack>
          </Flex>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" width="70%" />
        </Stack>
      </Box>
    );
  }

  return (
    <Box p={6} bg={cardBgColor} borderRadius="lg" boxShadow="md" borderWidth="1px" borderColor={borderColor} w="100%">
      <Flex direction={{ base: 'column', md: 'row' }} align={{ base: 'center', md: 'start' }}>
        <Image
          src={user?.avatar_url}
          alt={`${user?.login}'s avatar`}
          borderRadius="full"
          boxSize={{ base: '150px', md: '180px' }}
          mr={{ md: 6 }}
          mb={{ base: 4, md: 0 }}
        />

        <VStack align={{ base: 'center', md: 'start' }} spacing={3} flex={1}>
          <Heading as="h2" size="xl">
            {user?.name ?? user?.login}
          </Heading>

          <Text fontSize="lg" color="gray.500">
            @{user?.login}
          </Text>

          <Link href={user.html_url} isExternal color="blue.500">
            View GitHub Profile
          </Link>

          <Text fontSize="md" mt={2}>
            {user?.bio}
          </Text>

          <Flex wrap="wrap" gap={2} mt={4}>
            <Tag colorScheme="blue" size="md">
              Repositories: {user?.public_repos}
            </Tag>
            <Tag colorScheme="green" size="md">
              Followers: {user?.followers}
            </Tag>
            <Tag colorScheme="purple" size="md">
              Following: {user?.following}
            </Tag>
          </Flex>

          <Box mt={4}>
            {user?.location && (
              <Text fontSize="sm" color="gray.500" mb={1}>
                📍 {user?.location}
              </Text>
            )}

            {user.email && (
              <Text fontSize="sm" color="gray.500" mb={1}>
                ✉️ {user?.email}
              </Text>
            )}
            {user?.company && (
              <Text fontSize="sm" color="gray.500" mb={1}>
                🏢 {user?.company}
              </Text>
            )}
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default UserProfile;
