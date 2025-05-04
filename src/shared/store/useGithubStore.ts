import { create } from 'zustand';

export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

type State = {
  lastSearchedUser: string | null;
};

type Actions = {
  setLastSearchedUser: (username: string) => void;
  clearLastSearchedUser: () => void;
};

export const useGithubStore = create<State & Actions>((set) => ({
  lastSearchedUser: null,
  setLastSearchedUser: (username: string) => set({ lastSearchedUser: username }),
  clearLastSearchedUser: () => set({ lastSearchedUser: null })
}));
