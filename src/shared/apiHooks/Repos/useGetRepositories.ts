import { useState } from 'react';

import { API_BASE_URL } from '../../../api/githubApi';
import { ERROR_LOADING_REPOSITORIES } from '../../constants';
import { useMessage } from '../../hooks/useMessage';
import { GithubRepo } from '../../store/useGithubStore';

interface IUseGithubRepositories {
  isLoading: boolean;
  fetchUserRepositories: (username: string) => Promise<GithubRepo[] | undefined>;
}

export const useGetRepositories = (): IUseGithubRepositories => {
  const { errorToast } = useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserRepositories = async (username: string): Promise<GithubRepo[] | undefined> => {
    if (!username) {
      errorToast({ description: 'Username is required' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/${username}/repos`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Repositories not found');
        }
        throw new Error('Failed to fetch repositories');
      }

      return await response.json();
    } catch {
      errorToast({
        description: ERROR_LOADING_REPOSITORIES
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchUserRepositories };
};
