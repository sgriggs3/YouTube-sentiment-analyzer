# Optimized Workflow for YouTube Sentiment Analyzer Project

## Project Overview

**Project Description:** A web application designed to analyze sentiment in YouTube video comments and present visual insights.

**Key Features (from README.md):**

1.  YouTube API Integration
2.  Sentiment Analysis of Comments
3.  Basic Web User Interface (UI)
4.  API Endpoints for Data Access
5.  Basic Data Storage (Currently not implemented - using cache)
6.  Data Visualization Components
7.  Integration of Visualizations into the UI
8.  Advanced Sentiment Analysis (Future Enhancement)
9.  User Feedback Mechanism (Future Enhancement)
10. Real-Time Comment Analysis (Future Enhancement)
11. Advanced Web UI Features (Future Enhancement - User Authentication, Configuration)
12. Testing and Deployment

## Project File Structure

```
.gitignore
backend.zip
cline_instructions_combined.txt
config.json
DEPLOY_GUIDE.md
devcontainer.json
docker-compose.yml
Dockerfile
frontend.zip
optimized_workflow.md
optimized_workflow.txt
package.json
project_analysis.txt
README.md
requirements.txt
yarn.lock
YouTube-sentiment-analyzer-main.zip
backend/
backend/.env.example
backend/api.py
backend/app.py
backend/cache.py
backend/check_env.py
backend/config.py
backend/data_visualization.py
backend/database.py
backend/Dockerfile
backend/exceptions.py
backend/locustfile.py
backend/requirements.txt
backend/sentiment_analysis.py
backend/utils.py
backend/visualization.py
backend/youtube_api.py
backend/youtube_client.py
backend/tests/
backend/tests/test_api_endpoints.py
backend/tests/test_app.py
backend/tests/test_data_visualization.py
backend/tests/test_sentiment_analysis.py
backend/tests/test_youtube_api.py
codespaces-prebuilds/
codespaces-prebuilds/main.yaml
frontend/
frontend/Dockerfile
frontend/frontends.zip
frontend/package-lock.json
frontend/package.json
frontend/tsconfig.json
frontend/public/
frontend/public/index.html
frontend/src/
frontend/src/App.css
frontend/src/App.js
frontend/src/index.js
frontend/src/react-app-env.d.ts
frontend/src/theme.d.ts
frontend/src/theme.js
frontend/src/ThemeContext.js
frontend/src/components/
frontend/src/components/Analysis.js
frontend/src/components/ErrorBoundary.js
frontend/src/components/LoadingState.js
frontend/src/components/Navbar.js
frontend/src/components/SentimentChart.js
frontend/src/components/SentimentResults.js
frontend/src/components/Settings.js
frontend/src/components/VideoAnalyzer.js
frontend/src/components/VideoInput.js
frontend/src/components/VideoMetadata.js
frontend/src/components/layout/
frontend/src/components/layout/Layout.js
frontend/src/components/layout/Navbar.js
frontend/src/components/layout/PageTransition.js
frontend/src/components/visualizations/
frontend/src/components/visualizations/SentimentChart.js
frontend/src/components/visualizations/SentimentTrendChart.js
frontend/src/pages/
frontend/src/pages/Analysis.js
frontend/src/pages/Dashboard.js
frontend/src/pages/Settings.js
frontend/src/services/
frontend/src/services/api.js
frontend/src/tests/
frontend/src/tests/test_end_to_end.js
frontend/src/tests/test_ui_components.js
frontend/src/webui/
frontend/src/webui/App.js
frontend/src/webui/index.css
frontend/src/webui/index.tsx
frontend/src/webui/react-app-env.d.ts
frontend/src/webui/reportWebVitals.ts
frontend/src/webui/setupTests.ts
frontend/src/webui/components/
frontend/src/webui/components/analysis/
frontend/src/webui/components/analysis/AnalysisView.tsx
frontend/src/webui/components/chat/
frontend/src/webui/components/chat/Announcement.tsx
frontend/src/webui/components/chat/AutoApproveMenu.tsx
frontend/src/webui/components/chat/BrowserSessionRow.tsx
frontend/src/webui/components/chat/ChatRow.tsx
frontend/src/webui/components/chat/ChatTextArea.tsx
frontend/src/webui/components/chat/ChatView.tsx
frontend/src/webui/components/chat/ContextMenu.tsx
frontend/src/webui/components/chat/TaskHeader.tsx
frontend/src/webui/components/comments/
frontend/src/webui/components/comments/CommentList.tsx
frontend/src/webui/components/common/
frontend/src/webui/components/common/CodeAccordian.tsx
frontend/src/webui/components/common/CodeBlock.tsx
frontend/src/webui/components/common/Demo.tsx
frontend/src/webui/components/common/MarkdownBlock.tsx
frontend/src/webui/components/common/Thumbnails.tsx
frontend/src/webui/components/common/VSCodeButtonLink.tsx
frontend/src/webui/components/history/
frontend/src/webui/components/history/HistoryPreview.tsx
frontend/src/webui/components/history/HistoryView.tsx
frontend/src/webui/components/mcp/
frontend/src/webui/components/mcp/McpResourceRow.tsx
frontend/src/webui/components/mcp/McpToolRow.tsx
frontend/src/webui/components/mcp/McpView.tsx
frontend/src/webui/components/modern/
frontend/src/webui/components/modern/Button.tsx
frontend/src/webui/components/modern/Card.tsx
frontend/src/webui/components/modern/LoadingSpinner.tsx
frontend/src/webui/components/modern/Toast.tsx
frontend/src/webui/components/settings/
frontend/src/webui/components/settings/ApiOptions.tsx
frontend/src/webui/components/settings/OpenRouterModelPicker.tsx
frontend/src/webui/components/settings/SettingsView.tsx
frontend/src/webui/components/settings/TabNavbar.tsx
frontend/src/webui/components/visualization/
frontend/src/webui/components/visualization/SentimentChart.tsx
frontend/src/webui/components/welcome/
frontend/src/webui/components/welcome/WelcomeView.tsx
frontend/src/webui/context/
frontend/src/webui/context/ExtensionStateContext.tsx
frontend/src/webui/styles/
frontend/src/webui/styles/modern-theme.ts
frontend/src/webui/utils/
frontend/src/webui/utils/context-mentions.ts
frontend/src/webui/utils/format.ts
frontend/src/webui/utils/getLanguageFromPath.ts
frontend/src/webui/utils/mcp.ts
frontend/src/webui/utils/textMateToHljs.ts
frontend/src/webui/utils/validate.ts
frontend/src/webui/utils/vscode.ts
frontend/src/youtube_app/
frontend/src/youtube_app/App.css
frontend/src/youtube_app/App.js
frontend/src/youtube_app/ChatboxPage.js
frontend/src/youtube_app/CommentsDisplay.js
frontend/src/youtube_app/SettingsPage.js
frontend/src/youtube_app/VideoDisplay.js
frontend/src/youtube_app/VideoInput.js
templates/
templates/analysis.html
templates/configuration.html
templates/examples.html
templates/index.html
templates/modern_analysis.html
templates/scraping.html
templates/sentiment_results.html
templates/video_metadata.html
templates/visualization.html
YouTube-sentiment-analyzer/
YouTube-sentiment-analyzer/.gitignore
YouTube-sentiment-analyzer/backend.zip
YouTube-sentiment-analyzer/cline_instructions_combined.txt
YouTube-sentiment-analyzer/config.json
YouTube-sentiment-analyzer/DEPLOY_GUIDE.md
YouTube-sentiment-analyzer/devcontainer.json
YouTube-sentiment-analyzer/docker-compose.yml
YouTube-sentiment-analyzer/frontend.zip
YouTube-sentiment-analyzer/optimized_workflow.md
YouTube-sentiment-analyzer/package.json
YouTube-sentiment-analyzer/project_analysis.txt
YouTube-sentiment-analyzer/README.md
YouTube-sentiment-analyzer/requirements.txt
YouTube-sentiment-analyzer/yarn.lock
YouTube-sentiment-analyzer/YouTube-sentiment-analyzer-main.zip
YouTube-sentiment-analyzer/codespaces-prebuilds/
YouTube-sentiment-analyzer/codespaces-prebuilds/main.yaml
```

**Workflow Instructions and Tasks:**

This section outlines the development workflow, tasks, and instructions for contributing to the YouTube Sentiment Analyzer project. It is structured to be easily parsed by AI for workflow automation and task management.

### 1. Setup and Installation

**Status:** Complete (See README.md)

**Description:** Instructions for setting up the development environment and installing necessary dependencies.

**Files to Reference:**

*   `README.md`: Contains detailed installation and setup instructions.
*   `backend/requirements.txt`: Lists Python backend dependencies.
*   `frontend/package.json`: Lists frontend dependencies and scripts.
*   `config.json`:  Configuration file for API keys (YouTube API).
*   `.env.example`: Example environment variables file.

**Verification Steps:**

*   Ensure Python 3.8+ and Node.js 14+ are installed.
*   Verify YouTube API key is obtained and configured in `config.json`.
*   Confirm backend and frontend dependencies are installed without errors (`pip install -r backend/requirements.txt`, `npm install --prefix frontend`).

### 2. Backend Development

**Status:** In Progress

**Description:** Tasks related to backend API development, sentiment analysis logic, and data handling.

#### 2.1 API Endpoints Development

**Status:** In Progress

**Tasks:**

*   **Task 2.1.1: Implement YouTube Video Data Fetching API**
    *   **Description:** Create API endpoints to fetch video metadata and comments from YouTube API.
    *   **Files to Modify:**
        *   `backend/youtube_api.py`: Implement functions to interact with YouTube API.
        *   `backend/app.py`: Define API routes using Flask and integrate with `youtube_api.py`.
    *   **Errors/Issues:**
        *   Handle YouTube API errors (quota limits, invalid keys, video not found). (See DEPLOY_GUIDE.md for implemented error handling)
    *   **Suggestions:**
        *   Implement caching for API responses to reduce API calls and improve performance. (Cache implementation exists in `backend/cache.py`)
        *   Consider using asynchronous requests for API calls to improve responsiveness.
    *   **Code Pointers:**
        *   `backend/youtube_api.py`:  Existing YouTube API interaction logic.
        *   `backend/app.py`: Flask application setup and existing routes.
    *   **Verification Steps:**
        *   Test API endpoints using tools like curl or Postman to ensure data is fetched correctly.
        *   Check API error handling for various scenarios (invalid video IDs, API key issues).

*   **Task 2.1.2: Implement Sentiment Analysis API**
    *   **Description:** Develop API endpoints to perform sentiment analysis on text data (video comments).
    *   **Files to Modify:**
        *   `backend/sentiment_analysis.py`: Implement sentiment analysis functions (using NLTK or other libraries).
        *   `backend/app.py`: Define API routes and integrate with `sentiment_analysis.py`.
    *   **Errors/Issues:**
        *   Ensure sentiment analysis is accurate and handles different text inputs effectively.
        *   Address potential performance bottlenecks in sentiment analysis for large comment sets.
    *   **Suggestions:**
        *   Explore different sentiment analysis libraries and models for better accuracy and performance. (Current implementation uses VADER in `sentiment_analysis.py`)
        *   Implement options for different sentiment analysis granularity (e.g., comment-level, overall video sentiment).
    *   **Code Pointers:**
        *   `backend/sentiment_analysis.py`: Existing sentiment analysis implementation.
        *   `backend/app.py`: Flask application and API route definitions.
    *   **Verification Steps:**
        *   Test sentiment analysis API with various comment samples to check accuracy.
        *   Profile performance of sentiment analysis for large datasets.

#### 2.2 Data Storage (Future Implementation)

**Status:** Not Started (Currently using cache - `backend/cache.py`)

**Description:** Implement persistent data storage for analyzed video data and sentiment results.

**Tasks:**

*   **Task 2.2.1: Choose Database**
    *   **Description:** Select a suitable database (e.g., SQLite, PostgreSQL, MongoDB) for storing project data.
    *   **Considerations:**
        *   Project requirements (scalability, data complexity).
        *   Ease of integration with Python backend.
        *   Deployment environment.
    *   **Suggestions:**
        *   SQLite for simplicity (file-based, good for smaller projects).
        *   PostgreSQL or MongoDB for scalability and more complex data needs.

*   **Task 2.2.2: Implement Database Models**
    *   **Description:** Define database models to store video metadata, comments, and sentiment analysis results.
    *   **Files to Modify:**
        *   `backend/database.py`: Define database models using an ORM (e.g., SQLAlchemy for SQL databases, or ODM for NoSQL).
    *   **Suggestions:**
        *   Design models to efficiently query and retrieve data for API endpoints and visualizations.
        *   Consider data normalization and relationships between models.

*   **Task 2.2.3: Integrate Database with API**
    *   **Description:** Modify backend API endpoints to use the database for data persistence.
    *   **Files to Modify:**
        *   `backend/app.py`: Update API route handlers to interact with the database.
        *   `backend/youtube_api.py`:  Potentially modify data fetching to store data in the database.
    *   **Verification Steps:**
        *   Test API endpoints to ensure data is correctly stored and retrieved from the database.
        *   Verify database schema and data integrity.

### 3. Frontend Development

**Status:** In Progress

**Description:** Tasks related to developing the user interface, integrating with backend APIs, and displaying visualizations.

#### 3.1 UI Components Development

**Status:** In Progress

**Tasks:**

*   **Task 3.1.1: Enhance Video Input Component**
    *   **Description:** Improve the video input component for better user experience (e.g., input validation, clear instructions).
    *   **Files to Modify:**
        *   `frontend/src/components/VideoInput.js` (or relevant component file).
    *   **Suggestions:**
        *   Add input validation to ensure valid YouTube video URLs or IDs are entered.
        *   Provide clear placeholder text and instructions for users.
        *   Implement error handling for invalid input.
    *   **Code Pointers:**
        *   `frontend/src/components/VideoInput.js`: Existing video input component.
    *   **Verification Steps:**
        *   Test video input component with valid and invalid inputs.
        *   Check UI for clear error messages and user guidance.

*   **Task 3.1.2: Develop Sentiment Visualization Components**
    *   **Description:** Create React components to visualize sentiment analysis results (charts, graphs).
    *   **Files to Modify:**
        *   `frontend/src/components/SentimentChart.js` (or relevant visualization component files).
        *   `frontend/src/components/visualizations/` (directory for visualization components).
    *   **Suggestions:**
        *   Use charting libraries (e.g., Chart.js, Recharts) for creating interactive and informative visualizations. (Chart.js is currently used - `frontend/src/components/SentimentChart.js`)
        *   Implement different types of visualizations (e.g., bar charts, pie charts, trend lines) to represent sentiment data effectively.
    *   **Code Pointers:**
        *   `frontend/src/components/SentimentChart.js`: Existing chart component.
    *   **Verification Steps:**
        *   Test visualization components with sample sentiment data.
        *   Ensure visualizations are clear, informative, and responsive.

#### 3.2 API Integration in Frontend

**Status:** In Progress

**Tasks:**

*   **Task 3.2.1: Integrate Video Data API**
    *   **Description:** Connect the frontend to the backend API endpoints for fetching video data.
    *   **Files to Modify:**
        *   `frontend/src/services/api.js`: Implement functions to call backend API endpoints.
        *   `frontend/src/components/VideoAnalyzer.js` (or relevant component): Integrate API calls to fetch data and pass it to UI components.
    *   **Errors/Issues:**
        *   Handle API call errors gracefully in the frontend (network errors, backend errors). (Basic error handling implemented - see DEPLOY_GUIDE.md)
    *   **Suggestions:**
        *   Implement loading states to indicate API requests in progress. (LoadingState component exists - `frontend/src/components/LoadingState.js`)
        *   Use error boundary components to prevent UI crashes due to API errors. (ErrorBoundary component exists - `frontend/src/components/ErrorBoundary.js`)
    *   **Code Pointers:**
        *   `frontend/src/services/api.js`: Existing API service functions.
        *   `frontend/src/components/VideoAnalyzer.js`: Component handling video analysis logic.
    *   **Verification Steps:**
        *   Test frontend with backend API running to ensure data is fetched and displayed correctly.
        *   Simulate API errors to verify frontend error handling.

*   **Task 3.2.2: Integrate Sentiment Analysis API**
    *   **Description:** Connect frontend components to the backend sentiment analysis API.
    *   **Files to Modify:**
        *   `frontend/src/services/api.js`: Implement functions to call sentiment analysis API endpoints.
        *   `frontend/src/components/SentimentResults.js` (or relevant component): Integrate API calls to get sentiment data and display results.
    *   **Verification Steps:**
        *   Test frontend with backend API to ensure sentiment analysis results are displayed.
        *   Check data flow from API to visualization components.

### 4. Testing

**Status:** Partially Complete (Backend tests are present - `backend/tests/`)

**Description:** Implement comprehensive testing for backend and frontend components.

**Tasks:**

*   **Task 4.1: Write Backend Unit Tests**
    *   **Description:** Write unit tests for backend API endpoints, sentiment analysis functions, and database interactions (if implemented).
    *   **Files to Modify:**
        *   `backend/tests/`: Add new test files or update existing ones (e.g., `test_app.py`, `test_sentiment_analysis.py`).
    *   **Suggestions:**
        *   Use pytest framework for writing and running tests. (pytest is used - see `backend/tests/`)
        *   Aim for high test coverage to ensure code reliability.
        *   Test edge cases and error conditions.
    *   **Verification Steps:**
        *   Run backend tests using `pytest backend/tests/`.
        *   Check test coverage reports.

*   **Task 4.2: Implement Frontend Component Tests**
    *   **Description:** Write unit tests or component tests for React frontend components.
    *   **Files to Modify:**
        *   `frontend/src/tests/`: Add test files for frontend components.
    *   **Suggestions:**
        *   Use Jest and React Testing Library for component testing.
        *   Test component rendering, interactions, and API integrations.
    *   **Verification Steps:**
        *   Run frontend tests using `npm test --prefix frontend`.
        *   Check test coverage and component behavior.

*   **Task 4.3: Implement End-to-End Tests (Future Enhancement)**
    *   **Description:** Develop end-to-end tests to verify the entire application workflow (frontend to backend integration).
    *   **Suggestions:**
        *   Use tools like Cypress or Selenium for end-to-end testing.
        *   Test user flows, data flow, and overall application functionality.

### 5. Deployment

**Status:** Not Started (DEPLOY_GUIDE.md provides some deployment related info)

**Description:** Tasks related to deploying the application to a hosting platform.

**Tasks:**

*   **Task 5.1: Containerize Application (Docker)**
    *   **Description:** Dockerize the backend and frontend applications for consistent deployment.
    *   **Files to Modify:**
        *   `backend/Dockerfile`: Dockerfile for backend.
        *   `frontend/Dockerfile`: Dockerfile for frontend.
        *   `docker-compose.yml`: Define multi-container setup (if needed).
    *   **Suggestions:**
        *   Use multi-stage Docker builds to optimize image size.
        *   Define clear Dockerfile instructions and configurations.
    *   **Verification Steps:**
        *   Build Docker images and run containers locally to test deployment.
        *   Check Docker image size and container performance.

*   **Task 5.2: Choose Deployment Platform**
    *   **Description:** Select a cloud platform or hosting service for deployment (e.g., AWS, Heroku, Google Cloud, Azure).
    *   **Considerations:**
        *   Project budget and scalability requirements.
        *   Ease of deployment and management.
        *   Integration with other services (e.g., databases).

*   **Task 5.3: Implement Deployment Scripts/Process**
    *   **Description:** Create scripts or documentation for deploying the application to the chosen platform.
    *   **Suggestions:**
        *   Automate deployment process using CI/CD pipelines (e.g., GitHub Actions).
        *   Document deployment steps clearly in `DEPLOY_GUIDE.md`.

## Errors and Issues Summary

*   **Configuration Loading Errors:** Addressed in backend with `ConfigError` and error handling in `backend/app.py`. (See DEPLOY_GUIDE.md)
*   **YouTube API Errors:** Handled in backend with custom exceptions and error responses. (See DEPLOY_GUIDE.md)
*   **Frontend API Call Errors:** Basic error handling implemented in frontend with Toast notifications. (See DEPLOY_GUIDE.md)
*   **Database Integration:** Not yet implemented. Requires choosing a database, defining models, and integrating with backend API.
*   **Frontend Testing:** Partially implemented. Requires writing more comprehensive component tests.
*   **Deployment Automation:** Not yet fully implemented. Requires Dockerization, platform selection, and deployment scripts/CI/CD.

## Suggestions for Improvements

*   **Advanced Sentiment Analysis:** Explore more advanced NLP models for improved sentiment analysis accuracy (Task 8 in README.md Features).
*   **User Feedback Mechanism:** Implement a way for users to provide feedback on sentiment analysis results (Task 9 in README.md Features).
*   **Real-Time Analysis:** Consider implementing real-time comment analysis using streaming APIs (Task 10 in README.md Features).
*   **Advanced UI Features:** Implement user authentication, settings, and customization options in the frontend (Task 11 in README.md Features).
*   **Automated Testing:** Increase test coverage for both backend and frontend, and implement end-to-end tests (Tasks 4.1, 4.2, 4.3).
*   **Deployment Automation:** Fully automate the deployment process using CI/CD pipelines (Task 5.3).
*   **Performance Optimization:** Profile and optimize backend and frontend performance, especially for large datasets and API calls.
*   **Code Documentation:** Add more detailed code comments and documentation for better maintainability.
*   **Security Review:** Conduct a security review of the application to identify and address potential vulnerabilities.

## Full Project File Structure

```
.gitignore
backend.zip
cline_instructions_combined.txt
config.json
DEPLOY_GUIDE.md
devcontainer.json
docker-compose.yml
Dockerfile
frontend.zip
optimized_workflow.md
optimized_workflow.txt
package.json
project_analysis.txt
README.md
requirements.txt
yarn.lock
YouTube-sentiment-analyzer-main.zip
backend/
backend/.env.example
backend/api.py
backend/app.py
backend/cache.py
backend/check_env.py
backend/config.py
backend/data_visualization.py
backend/database.py
backend/Dockerfile
backend/exceptions.py
backend/locustfile.py
backend/requirements.txt
backend/sentiment_analysis.py
backend/utils.py
backend/visualization.py
backend/youtube_api.py
backend/youtube_client.py
backend/tests/
backend/tests/test_api_endpoints.py
backend/tests/test_app.py
backend/tests/test_data_visualization.py
backend/tests/test_sentiment_analysis.py
backend/tests/test_youtube_api.py
codespaces-prebuilds/
codespaces-prebuilds/main.yaml
frontend/
frontend/Dockerfile
frontend/frontends.zip
frontend/package-lock.json
frontend/package.json
frontend/tsconfig.json
frontend/public/
frontend/public/index.html
frontend/src/
frontend/src/App.css
frontend/src/App.js
frontend/src/index.js
frontend/src/react-app-env.d.ts
frontend/src/theme.d.ts
frontend/src/theme.js
frontend/src/ThemeContext.js
frontend/src/components/
frontend/src/components/Analysis.js
frontend/src/components/ErrorBoundary.js
frontend/src/components/LoadingState.js
frontend/src/components/Navbar.js
frontend/src/components/SentimentChart.js
frontend/src/components/SentimentResults.js
frontend/src/components/Settings.js
frontend/src/components/VideoAnalyzer.js
frontend/src/components/VideoInput.js
frontend/src/components/VideoMetadata.js
frontend/src/components/layout/
frontend/src/components/layout/Layout.js
frontend/src/components/layout/Navbar.js
frontend/src/components/layout/PageTransition.js
frontend/src/components/visualizations/
frontend/src/components/visualizations/SentimentChart.js
frontend/src/components/visualizations/SentimentTrendChart.js
frontend/src/pages/
frontend/src/pages/Analysis.js
frontend/src/pages/Dashboard.js
frontend/src/pages/Settings.js
frontend/src/services/
frontend/src/services/api.js
frontend/src/tests/
frontend/src/tests/test_end_to_end.js
frontend/src/tests/test_ui_components.js
frontend/src/webui/
frontend/src/webui/App.js
frontend/src/webui/index.css
frontend/src/webui/index.tsx
frontend/src/webui/react-app-env.d.ts
frontend/src/webui/reportWebVitals.ts
frontend/src/webui/setupTests.ts
frontend/src/webui/components/
frontend/src/webui/components/analysis/
frontend/src/webui/components/analysis/AnalysisView.tsx
frontend/src/webui/components/chat/
frontend/src/webui/components/chat/Announcement.tsx
frontend/src/webui/components/chat/AutoApproveMenu.tsx
frontend/src/webui/components/chat/BrowserSessionRow.tsx
frontend/src/webui/components/chat/ChatRow.tsx
frontend/src/webui/components/chat/ChatTextArea.tsx
frontend/src/webui/components/chat/ChatView.tsx
frontend/src/webui/components/chat/ContextMenu.tsx
frontend/src/webui/components/chat/TaskHeader.tsx
frontend/src/webui/components/comments/
frontend/src/webui/components/comments/CommentList.tsx
frontend/src/webui/components/common/
frontend/src/webui/components/common/CodeAccordian.tsx
frontend/src/webui/components/common/CodeBlock.tsx
frontend/src/webui/components/common/Demo.tsx
frontend/src/webui/components/common/MarkdownBlock.tsx
frontend/src/webui/components/common/Thumbnails.tsx
frontend/src/webui/components/common/VSCodeButtonLink.tsx
frontend/src/webui/components/history/
frontend/src/webui/components/history/HistoryPreview.tsx
frontend/src/webui/components/history/HistoryView.tsx
frontend/src/webui/components/mcp/
frontend/src/webui/components/mcp/McpResourceRow.tsx
frontend/src/webui/components/mcp/McpToolRow.tsx
frontend/src/webui/components/mcp/McpView.tsx
frontend/src/webui/components/modern/
frontend/src/webui/components/modern/Button.tsx
frontend/src/webui/components/modern/Card.tsx
frontend/src/webui/components/modern/LoadingSpinner.tsx
frontend/src/webui/components/modern/Toast.tsx
frontend/src/webui/components/settings/
frontend/src/webui/components/settings/ApiOptions.tsx
frontend/src/webui/components/settings/OpenRouterModelPicker.tsx
frontend/src/webui/components/settings/SettingsView.tsx
frontend/src/webui/components/settings/TabNavbar.tsx
frontend/src/webui/components/visualization/
frontend/src/webui/components/visualization/SentimentChart.tsx
frontend/src/webui/components/welcome/
frontend/src/webui/components/welcome/WelcomeView.tsx
frontend/src/webui/context/
frontend/src/webui/context/ExtensionStateContext.tsx
frontend/src/webui/styles/
frontend/src/webui/styles/modern-theme.ts
frontend/src/webui/utils/
frontend/src/webui/utils/context-mentions.ts
frontend/src/webui/utils/format.ts
frontend/src/webui/utils/getLanguageFromPath.ts
frontend/src/webui/utils/mcp.ts
frontend/src/webui/utils/textMateToHljs.ts
frontend/src/webui/utils/validate.ts
frontend/src/webui/utils/vscode.ts
frontend/src/youtube_app/
frontend/src/youtube_app/App.css
frontend/src/youtube_app/App.js
frontend/src/youtube_app/ChatboxPage.js
frontend/src/youtube_app/CommentsDisplay.js
frontend/src/youtube_app/SettingsPage.js
frontend/src/youtube_app/VideoDisplay.js
frontend/src/youtube_app/VideoInput.js
templates/
templates/analysis.html
templates/configuration.html
templates/examples.html
templates/index.html
templates/modern_analysis.html
templates/scraping.html
templates/sentiment_results.html
templates/video_metadata.html
templates/visualization.html
YouTube-sentiment-analyzer/
YouTube-sentiment-analyzer/.gitignore
YouTube-sentiment-analyzer/backend.zip
YouTube-sentiment-analyzer/cline_instructions_combined.txt
YouTube-sentiment-analyzer/config.json
YouTube-sentiment-analyzer/DEPLOY_GUIDE.md
YouTube-sentiment-analyzer/devcontainer.json
YouTube-sentiment-analyzer/docker-compose.yml
YouTube-sentiment-analyzer/frontend.zip
YouTube-sentiment-analyzer/optimized_workflow.md
YouTube-sentiment-analyzer/package.json
YouTube-sentiment-analyzer/project_analysis.txt
YouTube-sentiment-analyzer/README.md
YouTube-sentiment-analyzer/requirements.txt
YouTube-sentiment-analyzer/yarn.lock
YouTube-sentiment-analyzer/YouTube-sentiment-analyzer-main.zip
YouTube-sentiment-analyzer/codespaces-prebuilds/
YouTube-sentiment-analyzer/codespaces-prebuilds/main.yaml