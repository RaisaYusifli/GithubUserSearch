# GitHub Search

A modern web application for searching GitHub repositories using the GitHub REST API.

## Project Overview

GitHub Search is a React-based web application that allows users to search for GitHub repositories using various search criteria. The application provides an intuitive interface for exploring GitHub repositories, viewing repository details, and filtering search results.

### Key Features

- Search GitHub repositories by keywords, language, stars, and more
- Filter search results by programming language, stars, and forks
- View detailed repository information including description, language, stars, forks, and last update
- Responsive design that works across desktop and mobile devices
- Modern UI with Chakra styling

## Tech Stack

- **Frontend**:
  - React.js
  - React Router for navigation
  - Chakra for styling
  - Axios for API requests

- **API**:
  - GitHub REST API v3

- **Development Tools**:
  - ESLint for code quality
  - Prettier for code formatting
  - npm for package management

## Installation & Usage

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/github-search.git
   cd github-search
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your GitHub personal access token (optional but recommended to avoid API rate limiting):
   ```
   VITE_GITHUB_TOKEN=your_personal_access_token
   ```
   
   You can generate a token at [GitHub Developer Settings](https://github.com/settings/tokens).

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build files will be in the `dist` directory.

## Usage Guide

1. Enter search terms in the search box
2. Use filters to narrow down results by language, stars, or forks
3. Click on a repository card to view more details
4. Navigate between pages of results

## Project Structure

```
github-search/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── RepositoryCard.jsx
│   │   ├── RepositoryDetails.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── SearchResults.jsx
│   │   └── ...
│   ├── api/
│   │   └── githubApi.js
│   ├── shared/
│   │   └── hooks
│   │   └── store
│   │   └── theme
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

Raisa Yusifli - [yusiflireise2003@gmail.com](mailto:yusiflireise2003@gmail.com)

Project Link: [https://github.com/RaisaYusifli/GithubUserSearch](https://github.com/RaisaYusifli/GithubUserSearch)