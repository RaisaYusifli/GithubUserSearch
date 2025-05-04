import { Box, Button, useColorMode } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

import { AppRouter } from './AppRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <QueryClientProvider client={queryClient}>
      <Box position="relative" minH="100vh">
        <Box position="absolute" top="20px" right="20px" zIndex={2}>
          <Button onClick={toggleColorMode} size="md" borderRadius="full">
            {colorMode === 'light' ? <Moon className="icon" /> : <Sun className="icon" />}
          </Button>
        </Box>

        <AppRouter />
      </Box>
    </QueryClientProvider>
  );
};

export default App;
