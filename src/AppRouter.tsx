import { Container } from '@chakra-ui/react';
import React from 'react';
import { useRoutes } from 'react-router-dom';

import { routes } from './routes';

export const AppRouter: React.FC = () => {
  return (
    <Container maxW={'100%'} pb={'20px'} boxSizing="border-box">
      {useRoutes(routes)}
    </Container>
  );
};
