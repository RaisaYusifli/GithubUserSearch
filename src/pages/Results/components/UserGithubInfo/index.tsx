import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

import RepoList from '../../../../components/RepoList';
import UserProfile from '../../../../components/UserProfile';
import { GithubRepo } from '../../../../shared/store/useGithubStore';
import { ANIMATION_VARIANTS } from '../../constants/animations';
import { renderErrorState } from '../RenderError';
import { renderLoadingState } from '../RenderLoading';

const MotionBox = motion(Box);

interface ContentRendererProps {
  username: string | null;
  isUserLoading: boolean;
  isUserError: boolean;
  userData: any;
  reposData: GithubRepo[] | undefined;
  isReposLoading: boolean;
  paginationData: {
    currentRepos: any[];
  };
  renderPagination: React.ReactNode;
}

const UserGithubInfo: React.FC<ContentRendererProps> = ({
  username,
  isUserLoading,
  isUserError,
  userData,
  reposData,
  isReposLoading,
  paginationData,
  renderPagination
}) => {
  if (isUserLoading && !userData) {
    return renderLoadingState();
  }

  if (isUserError && !userData) {
    return renderErrorState(username);
  }

  return (
    <MotionBox variants={ANIMATION_VARIANTS.container} initial="hidden" animate="visible" exit="exit">
      {userData && (
        <MotionBox variants={ANIMATION_VARIANTS.item}>
          <UserProfile user={userData} isLoading={isUserLoading} />
        </MotionBox>
      )}

      <MotionBox variants={ANIMATION_VARIANTS.item} id="repos-section">
        {reposData && (
          <>
            <RepoList repos={paginationData.currentRepos} isLoading={isReposLoading} />
            {renderPagination}
          </>
        )}
      </MotionBox>
    </MotionBox>
  );
};

export default UserGithubInfo;
