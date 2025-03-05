# CADENCE-Comp313-003

Developed by Group 3, **CADENCE-Comp313-003** is a web application designed for musicians. Our project aims to connect musicians, enabling them to find other musicians to play, perform, and record music together. It also serves as a platform for posting and finding gig or performance opportunities.

## Application Architecture

Below is the architecture diagram of the CADENCE web application:

CADENCE Web App Architecture - https://imgur.com/a/vf3azL1

### Architecture Description

- **User Interaction**:
  Musicians interact with the front-end interface, which is built using HTML, CSS, JavaScript, and React. This interface allows users to create and edit profiles, browse collaborations, and send messages.

- **Data Flow**:
  User interactions with the front-end trigger requests to the API (backend logic), which processes these requests. The API handles tasks such as matching musicians for collaborations and retrieving user profiles and gig details to be sent back to the user.

- **Backend Systems**:
  The web server hosts the application and manages communication between the front-end, the back-end, and the data storage systems.

- **File System**:
  Static files like images and media (e.g., profile pictures, gig posters) are stored here. The backend ensures these files are accessible to users upon request.

- **Database**:
  Uses MongoDB to store and manage data related to users, their collaborations, and chat history. When a request is made, the API fetches the necessary data from the database and sends it back to the front-end.

- **Security and Data Integrity**:
  The API prioritizes data validation and security during interactions with the database and file system to protect user data. Only authorized requests are processed.

## Git Workflow and Architecture

Our project utilizes a structured Git workflow to efficiently manage the development across multiple iterations and feature branches. Below is a detailed explanation of our repository's branching strategy, designed to support parallel development of features, regular integration, and robust testing.

Git Architecture Diagram - https://imgur.com/a/7mqgIp0

### Description of the Git Architecture

- **Main Branch**: 
  The central repository of the project where the source code's current stable version is maintained. All major releases are pulled from this branch.

- **Iteration Branches**:
  - **Iteration 1** and **Iteration 2**: These branches represent different stages or versions of the project. They are used for developing new features in isolation before integrating them into the main branch.

- **Feature Branches**:
  - **Front-end and Back-end**: Branches split from the respective iteration branch to focus specifically on the front-end or back-end parts of the project. This separation helps in specialized testing and faster development without interfering with other parts of the application.
  - Each branch may have sub-branches for individual features or tasks assigned to different team members, such as Mayvis, Curtis, and Ritika on the front-end.

- **Staging Branches**:
  - **StagingFrontend and StagingBackend**: Critical for integration testing, acting as pre-production branches where code from feature branches is merged for final testing before moving back to the iteration branches or eventually to the main branch.

- **Team Member Specific Branches**:
  - Branches like Ana and Vivian are used by individual team members for specific tasks or bug fixes, allowing developers to work independently on their tasks without impacting the main development flow.

### Integrating and Managing Changes

- **Merging**: After development and initial testing are completed in the feature branches, changes are merged back into their respective staging branches for further integration testing.
- **Pull Requests**: To ensure code quality and maintainability, pull requests are used for merging changes, allowing team leads or other developers to review code before it integrates into the main project.
- **Continuous Integration/Continuous Deployment (CI/CD)**: Automated pipelines are set up to build and test the application whenever changes are pushed to specific branches, particularly the main branch and staging branches.




## Running the Application and Basic Git Commands

| Task                         | Commands/Instruction                                                                                                                |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Run the Backend**          | 1. Navigate to the backend directory: `cd backend`<br>2. Install dependencies: `npm install`<br>3. Start the server: node server.js
`   |
| **Run the Frontend**         | 1. Navigate to the frontend directory: `cd frontend`<br>2. Install dependencies: `npm install`<br>3. Start the app: `npm start`    |
| **Basic Git Commands**       | - Check status: `git status`<br>- Add changes: `git add .`<br>- Commit changes: `git commit -m "Your comment"`<br>- Push changes: `git push` |

### Detailed Instructions

#### Backend
- **Navigate to backend directory**: Open a terminal or command prompt and change directory to your backend folder with `cd backend`.
- **Install dependencies**: Ensure all necessary dependencies are installed by running `npm install`.
- **Start the server**: Launch your backend server with `npm start`, which should start listening for requests on a predefined port.

#### Frontend
- **Navigate to frontend directory**: In a separate terminal window, change to the frontend directory using `cd frontend`.
- **Install dependencies**: Run `npm install` to install required packages for the frontend.
- **Start the frontend application**: Execute `npm start` to compile and launch your frontend application in the default web browser.

#### Using Git
- **Check Git status**: Use `git status` to see uncommitted changes.
- **Add changes**: Add all current changes to the staging area with `git add .`.
- **Commit changes**: Commit your staged changes with a descriptive message using `git commit -m "Your comment"`.
- **Push changes**: Push your commits to your remote repository using `git push`. Ensure you specify the branch if not pushing to the main branch.

### Common Troubleshooting
- **Ensure all environment variables are correctly set** for both the frontend and backend operations.
- **Resolve any dependency issues** by possibly removing the `node_modules` folder and `package-lock.json` file, then running `npm install` again.
- **Manage port conflicts** by checking that no other processes are running on the same ports as your application.
- **Address network issues** by confirming that your firewall or network settings do not block the application ports.

## Using the `.env` File

The `.env` file is used to manage sensitive configuration details and environment variables securely. This file is not tracked by Git to protect secrets such as API keys, database passwords, and other private data.

### Purpose of the `.env` File

- **Security**: Keeps sensitive data like API keys and passwords out of the public codebase.
- **Flexibility**: Allows you to change settings without altering the code; especially useful for switching between development and production environments.

### How to Use the `.env` File

1. **Location**: Ensure the `.env` file is located in the root of your project (both backend and frontend if applicable).
2. **Content**: Add environment-specific variables in the format `KEY=value`. For example:
   ```plaintext
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   API_KEY=your_api_key_here

