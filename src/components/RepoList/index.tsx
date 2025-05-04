import { Badge, Box, Flex, Heading, Link, SimpleGrid, Skeleton, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

import { GithubRepo } from '../../shared/store/useGithubStore';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionSimpleGrid = motion(SimpleGrid);

interface RepoListProps {
  repos: GithubRepo[];
  isLoading: boolean;
}

const RepoList: React.FC<RepoListProps> = ({ repos, isLoading }) => {
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  if (isLoading) {
    return (
      <Box w="100%" mt={8}>
        <Heading as="h3" size="lg" mb={6}>
          Repositories
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height="160px" borderRadius="lg" />
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (repos.length === 0) {
    return (
      <Box w="100%" mt={8}>
        <Heading as="h3" size="lg" mb={6}>
          Repositories
        </Heading>
        <Box p={6} bg={cardBgColor} borderRadius="lg" boxShadow="sm">
          <Text>No public repositories found.</Text>
        </Box>
      </Box>
    );
  }

  const sortedRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);

  return (
    <Box w="100%" mt={8}>
      <MotionHeading
        as="h3"
        size="lg"
        mb={6}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Repositories ({repos?.length})
      </MotionHeading>

      <MotionSimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={4}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sortedRepos.map((repo) => (
          <MotionBox
            key={repo.id}
            p={5}
            bg={cardBgColor}
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
            height="100%"
            display="flex"
            flexDirection="column"
            variants={itemVariants}
            whileHover={{
              y: -8,
              boxShadow: 'xl',
              transition: { duration: 0.2 }
            }}
          >
            <Heading as="h4" size="md" mb={2} noOfLines={1}>
              <Link href={repo?.html_url} isExternal>
                {repo?.name}
              </Link>
            </Heading>

            <Text fontSize="sm" color="gray.500" mb={3} flex="1" noOfLines={2}>
              {repo?.description}
            </Text>

            <Flex mt="auto" justify="space-between" align="center" wrap="wrap">
              <Flex align="center">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Text fontSize="sm" fontWeight="bold">
                    ⭐ {repo?.stargazers_count.toLocaleString()}
                  </Text>
                </motion.div>
              </Flex>

              <motion.div whileHover={{ scale: 1.1 }}>
                <Badge colorScheme="blue" variant="subtle" borderRadius="full" px={2}>
                  {repo?.language || 'No language'}
                </Badge>
              </motion.div>
            </Flex>
          </MotionBox>
        ))}
      </MotionSimpleGrid>
    </Box>
  );
};

export default RepoList;
