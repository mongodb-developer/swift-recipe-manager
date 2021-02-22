# React Frontend Instructions

The frontend, built with React, is for interacting with the backend built with Swift. The idea is that the frontend consumes API endpoints and works with the JSON responses.

## Installing the Dependencies

After cloning the repository, the project and development dependencies must be installed on the development machine. To do this, navigate to the **frontend** directory and execute the following:

```
npm install
```

The above command will install all dependencies found in the **package.json** file.

## Running a Local Development Server

To run the application and access it at http://localhost:3000, execute the following command:

```
npm run start
```

The above command will package the React application and TailwindCSS dependencies. The above command will not create a production build of the application, only one that is suitable for local serving.