import { useState } from 'react';

import { API_BASE_URL } from '../../../api/githubApi';
import { ERROR_LOADING_USER } from '../../constants';
import { useMessage } from '../../hooks/useMessage';
import { GithubUser } from '../../store/useGithubStore';

interface IUseGithubUser {
  isLoading: boolean;
  fetchUser: (username: string) => Promise<GithubUser | undefined>;
}

export const useGetUser = (): IUseGithubUser => {
  const { errorToast } = useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUser = async (username: string): Promise<GithubUser | undefined> => {
    if (!username) {
      const errorMessage = 'Username is required';
      errorToast({ description: errorMessage });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/${username}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        }
        throw new Error('Failed to fetch user data');
      }

      return await response.json();
    } catch {
      const errorMessage = ERROR_LOADING_USER;
      errorToast({ description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchUser };
};
