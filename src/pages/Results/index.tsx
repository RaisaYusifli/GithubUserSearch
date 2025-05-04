import { Box, Button, Container, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import RepoList from '../../components/RepoList';
import UserProfile from '../../components/UserProfile';
import { useGetRepositories } from '../../shared/apiHooks/Repos/useGetRepositories';
import { useGetUser } from '../../shared/apiHooks/User/useGetUser';
import { useGithubStore } from '../../shared/store/useGithubStore';
import { renderErrorState } from './components/RenderError';
import { renderLoadingState } from './components/RenderLoading';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const { setLastSearchedUser } = useGithubStore();

  const { fetchUser } = useGetUser();
  const { fetchUserRepositories } = useGetRepositories();

  const bgColor = useColorModeValue('gray.50', 'gray.800');

  useEffect(() => {
    if (username) {
      setLastSearchedUser(username);
    }
  }, [username, setLastSearchedUser]);

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError
  } = useQuery({
    queryKey: ['user', username],
    queryFn: () => fetchUser(username as string),
    enabled: !!username,
    staleTime: 1000 * 60 * 5
  });

  const { data: reposData, isLoading: isReposLoading } = useQuery({
    queryKey: ['repos', username],
    queryFn: () => fetchUserRepositories(username as string),
    enabled: !!username,
    staleTime: 1000 * 60 * 5
  });

  const handleBackToSearch = () => {
    navigate('/');
  };

  const renderContent = (username: string | null) => {
    if (isUserLoading && !userData) {
      return renderLoadingState();
    }

    if (isUserError && !userData) {
      return renderErrorState(username);
    }

    return (
      <>
        {userData && <UserProfile user={userData} isLoading={isUserLoading} />}
        {reposData && <RepoList repos={reposData} isLoading={isReposLoading} />}
      </>
    );
  };

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.lg">
        <Button onClick={handleBackToSearch} mb={8}>
          Back to Search
        </Button>
        {renderContent(username ?? null)}
      </Container>
    </Box>
  );
};

export default Results;
