import { Badge, Box, Flex, Heading, Link, SimpleGrid, Skeleton, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { GithubRepo } from '../../shared/store/useGithubStore';

interface RepoListProps {
  repos: GithubRepo[];
  isLoading: boolean;
}

const RepoList: React.FC<RepoListProps> = ({ repos, isLoading }) => {
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (isLoading) {
    return (
      <Box w="100%" mt={8}>
        <Heading as="h3" size="lg" mb={6}>
          Repositories
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
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
      <Heading as="h3" size="lg" mb={6}>
        Repositories ({repos?.length})
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {sortedRepos.map((repo) => (
          <Box
            key={repo.id}
            p={5}
            bg={cardBgColor}
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
            transition="transform 0.2s"
            _hover={{ transform: 'translateY(-4px)', boxShadow: 'md' }}
            height="100%"
            display="flex"
            flexDirection="column"
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
                <Text fontSize="sm" fontWeight="bold">
                  {repo?.stargazers_count.toLocaleString()}
                </Text>
              </Flex>

              <Badge colorScheme="blue" variant="subtle" borderRadius="full" px={2}>
                {repo?.language}
              </Badge>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RepoList;
