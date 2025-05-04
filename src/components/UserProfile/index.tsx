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
import { motion } from 'framer-motion';
import React from 'react';

import { GithubUser } from '../../shared/store/useGithubStore';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionHeading = motion(Heading);
const MotionFlex = motion(Flex);

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
    <MotionBox
      p={6}
      bg={cardBgColor}
      borderRadius="lg"
      boxShadow="md"
      borderWidth="1px"
      borderColor={borderColor}
      w="100%"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: 'lg' }}
    >
      <MotionFlex direction={{ base: 'column', md: 'row' }} align={{ base: 'center', md: 'start' }}>
        <MotionImage
          src={user?.avatar_url}
          alt={`${user?.login}'s avatar`}
          borderRadius="full"
          boxSize={{ base: '150px', md: '180px' }}
          mr={{ md: 6 }}
          mb={{ base: 4, md: 0 }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        />

        <VStack align={{ base: 'center', md: 'start' }} spacing={3} flex={1}>
          <MotionHeading
            as="h2"
            size="xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {user?.name ?? user?.login}
          </MotionHeading>

          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
            <Text fontSize="lg" color="gray.500">
              @{user?.login}
            </Text>
          </MotionBox>

          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.4 }}>
            <Link href={user.html_url} isExternal color="blue.500">
              View GitHub Profile
            </Link>
          </MotionBox>

          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }}>
            <Text fontSize="md" mt={2}>
              {user?.bio}
            </Text>
          </MotionBox>

          <MotionFlex
            wrap="wrap"
            gap={2}
            mt={4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Tag colorScheme="blue" size="md">
                Repositories: {user?.public_repos}
              </Tag>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Tag colorScheme="green" size="md">
                Followers: {user?.followers}
              </Tag>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Tag colorScheme="purple" size="md">
                Following: {user?.following}
              </Tag>
            </motion.div>
          </MotionFlex>

          <MotionBox mt={4} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
          </MotionBox>
        </VStack>
      </MotionFlex>
    </MotionBox>
  );
};

export default UserProfile;
