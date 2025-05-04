import { Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

export const renderLoadingState = () => (
  <Flex justify="center" align="center" direction="column" py={12}>
    <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" mb={4} />
    <Text fontSize="lg">Loading user profile...</Text>
  </Flex>
);
