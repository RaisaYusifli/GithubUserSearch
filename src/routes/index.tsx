import React from 'react';
import { RouteObject } from 'react-router-dom';

import Results from '../pages/Results';
import Search from '../pages/Search';

export const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Search />
      },
      {
        path: 'user/:username',
        element: <Results />
      }
    ]
  }
];
