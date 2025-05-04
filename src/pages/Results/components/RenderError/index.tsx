import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export const renderErrorState = (username: string | null) => (
  <Flex justify="center" align="center" direction="column" py={12}>
    <Heading as="h2" size="xl" textAlign="center" color="red.500" mb={4}>
      User Not Found
    </Heading>
    <Text fontSize="lg" textAlign="center">
      We could not find the GitHub user {username}. Please check the username and try again.
    </Text>
  </Flex>
);
