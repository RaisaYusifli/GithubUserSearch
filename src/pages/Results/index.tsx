import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  IconButton,
  Select,
  Text,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetRepositories } from '../../shared/apiHooks/Repos/useGetRepositories';
import { useGetUser } from '../../shared/apiHooks/User/useGetUser';
import { useGithubStore } from '../../shared/store/useGithubStore';
import UserGithubInfo from './components/UserGithubInfo';
import { MAX_PAGE_BUTTONS, REPOS_PER_PAGE_OPTIONS } from './constants/pagination';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const { setLastSearchedUser } = useGithubStore();
  const { fetchUser } = useGetUser();
  const { fetchUserRepositories } = useGetRepositories();
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage, setReposPerPage] = useState(9);

  useEffect(() => {
    if (username) {
      setLastSearchedUser(username);
    }
  }, [username]);

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

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    document.getElementById('repos-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handlePerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setReposPerPage(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  const paginationData = useMemo(() => {
    const indexOfLastRepo = currentPage * reposPerPage;
    const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
    const currentRepos = reposData ? reposData.slice(indexOfFirstRepo, indexOfLastRepo) : [];
    const totalPages = reposData ? Math.ceil(reposData.length / reposPerPage) : 0;

    let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    let endPage = startPage + MAX_PAGE_BUTTONS - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);
    }

    return {
      currentRepos,
      totalPages,
      startPage,
      endPage,
      totalRepos: reposData?.length ?? 0,
      showingFrom: indexOfFirstRepo + 1,
      showingTo: Math.min(indexOfLastRepo, reposData?.length ?? 0)
    };
  }, [reposData, currentPage, reposPerPage]);

  const renderPagination = useMemo(() => {
    if (!reposData || reposData.length === 0) return null;

    const { totalPages, startPage, endPage, totalRepos, showingFrom, showingTo } = paginationData;

    return (
      <Box mt={6}>
        <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={4} mb={3}>
          <Flex alignItems="center">
            <Text mr={2}>Repos per page:</Text>
            <Select
              value={reposPerPage}
              onChange={handlePerPageChange}
              size="sm"
              width="80px"
              aria-label="Select repositories per page"
            >
              {REPOS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Flex>

          <Text fontSize="sm" color="gray.600">
            Showing {showingFrom} to {showingTo} of {totalRepos} repositories
          </Text>
        </Flex>

        <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
          <ButtonGroup size="sm" isAttached variant="outline">
            <Tooltip label="First page">
              <MotionIconButton
                aria-label="First page"
                icon={<ArrowLeftIcon />}
                onClick={() => handlePageChange(1)}
                isDisabled={currentPage === 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Tooltip>

            <Tooltip label="Previous page">
              <MotionIconButton
                aria-label="Previous page"
                icon={<ChevronLeftIcon />}
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Tooltip>

            {startPage > 1 && (
              <Button size="sm" variant="outline" pointerEvents="none">
                ...
              </Button>
            )}

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
              <MotionButton
                key={pageNum}
                size="sm"
                colorScheme={currentPage === pageNum ? 'blue' : 'gray'}
                variant={currentPage === pageNum ? 'solid' : 'outline'}
                onClick={() => handlePageChange(pageNum)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Go to page ${pageNum}`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </MotionButton>
            ))}

            {endPage < totalPages && (
              <Button size="sm" variant="outline" pointerEvents="none">
                ...
              </Button>
            )}

            <Tooltip label="Next page">
              <MotionIconButton
                aria-label="Next page"
                icon={<ChevronRightIcon />}
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Tooltip>

            <Tooltip label="Last page">
              <MotionIconButton
                aria-label="Last page"
                icon={<ArrowRightIcon />}
                onClick={() => handlePageChange(totalPages)}
                isDisabled={currentPage === totalPages}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Tooltip>
          </ButtonGroup>
        </Flex>

        {totalPages > MAX_PAGE_BUTTONS && (
          <Flex justifyContent="center" mt={3}>
            <Text fontSize="sm" mr={2}>
              Jump to page:
            </Text>
            <Select
              size="xs"
              width="60px"
              value={currentPage}
              onChange={(e) => handlePageChange(Number(e.target.value))}
              aria-label="Jump to page"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Select>
          </Flex>
        )}
      </Box>
    );
  }, [reposData, reposPerPage, currentPage, paginationData]);

  return (
    <MotionBox
      bg={bgColor}
      minH="100vh"
      py={10}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.lg">
        <MotionButton
          onClick={handleBackToSearch}
          mb={8}
          whileHover={{ scale: 1.05, backgroundColor: '#3182CE' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          aria-label="Back to search"
          leftIcon={<ArrowLeftIcon />}
        >
          Back to Search
        </MotionButton>

        <UserGithubInfo
          username={username ?? null}
          isUserLoading={isUserLoading}
          isUserError={isUserError}
          userData={userData}
          reposData={reposData}
          isReposLoading={isReposLoading}
          paginationData={paginationData}
          renderPagination={renderPagination}
        />
      </Container>
    </MotionBox>
  );
};

export default Results;
