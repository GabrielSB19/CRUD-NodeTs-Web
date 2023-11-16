# Setting Up and Executing a Node.js Program from GitHub 🚀

This guide provides a step-by-step walkthrough for configuring and running a pre-existing Node.js program sourced from GitHub. The program leverages MongoDB with Mongoose, JWT for authentication, and Express.js with TypeScript.

## Prerequisites

1. **Node.js and npm**: Ensure Node.js and npm are installed on your machine. If not, download and install them from the [official Node.js website](https://nodejs.org/). 🌐

2. **MongoDB**: Install MongoDB on your machine by downloading and installing it from the [official MongoDB website](https://www.mongodb.com/try/download/community). 🍃

## Clone the GitHub Repository

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/username/repository.git
   cd repository
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

## Project Configuration

1. **Configure Environment Variables**:

   Create a `.env` file in the project root and set up MongoDB connection string and JWT secret.

   ```env
   MONGO_URI=mongodb://your-mongodb-uri
   JWT_SECRET=your-secret-key
   PORT=8000 (Default)
   ```

2. **TypeScript Configuration**:

   Ensure TypeScript is properly configured. If not, create or update `tsconfig.json` with the appropriate settings.

   ```json
   {
     "compilerOptions": {
       // ...your settings
     },
     "include": ["src/**/*.ts"],
     "exclude": ["node_modules"]
   }
   ```

## Running the Application

1. **Start MongoDB**:

   Launch your MongoDB server:

   Mongo atlas was used, so our database will always be in the cloud.

2. **Build and Run the TypeScript Application**:

   ```bash
   npm run dev
   ```

   Alternatively, use `ts-node` to run TypeScript files directly:

   ```bash
   ts-node src/app.ts
   ```

3. **Access the API**:

   Open your browser or utilize tools like [Postman](https://www.postman.com/) to interact with the API.

## Conclusion

Congratulations! You've successfully configured and executed the existing Node.js program from GitHub, incorporating MongoDB, Mongoose, JWT, and Express.js with TypeScript. Feel free to explore and enhance the functionality as per your requirements. 🎉

## Video About the App

In this [Link](https://www.youtube.com/watch?v=0tFfklibBeg) you can see the video about how the functions of the App.

# Documentation EndPoints

# Route Descriptions and Data Types

This README provides a detailed explanation of the routes defined in your Express application, along with associated data types.

## User Routes

### 1. Log In

- **Description:** Endpoint for authenticating users.
- **HTTP Method:** `POST`
- **Route:** `/login`
- **Controller:** `userController.login`
- **Received Data Types:**

  - `Request` (Express): Not specified in the code, typically contains HTTP request data.
  - `Response` (Express): Not specified in the code, usually used to send the HTTP response.

  ```json
  {
    "email": "Leonardo@gmail.com",
    "password": "leonardo123"
  }
  ```

### 2. Create User

- **Description:** Endpoint for creating a new user.
- **HTTP Method:** `POST`
- **Route:** `/users`
- **Middleware:** `autServices.auth`, `autServices.hasRole("admin")`
- **Controller:** `userController.create`
- **Received Data Types:**

  - `Request` (Express): Request body must contain the data of the user to be created.

  ```json
  {
    "name": "David",
    "email": "David@gmail.com",
    "password": "david123",
    "role": "user"
  }
  ```

### 3. Get All Users

- **Description:** Endpoint to get all users.
- **HTTP Method:** `GET`
- **Route:** `/users`
- **Controller:** `userController.findAll`
- **Received Data Types:**
  - `Request` (Express): No data expected in the request.
  - `Response` (Express): Not specified in the code, usually used to send the HTTP response.

### 4. Get User by ID

- **Description:** Endpoint to get a user by their ID.
- **HTTP Method:** `GET`
- **Route:** `/users/:id`
- **Controller:** `userController.findOne`
- **Received Data Types:**
  - `Request` (Express): Route parameter (`id`) specifying the user's ID.
  - `Response` (Express): Not specified in the code, usually used to send the HTTP response.

### 5. Update User by ID

- **Description:** Endpoint to update a user by their ID.
- **HTTP Method:** `PUT`
- **Route:** `/users/:id`
- **Controller:** `userController.update`
- **Received Data Types:**

  - `Request` (Express): Route parameter (`id`) specifying the user's ID to update. Request body must contain the new user data.

    ```json
    {
      "groups": [],
      "_id": "65555058285769287a0d79aa",
      "name": "Gabriel",
      "email": "Gabriel@gmail.com",
      "password": "$2b$10$lN1E/SxxEh.5E9XNk1RPKOZiLZGWv579TD6lDdgsua9MQ90uIr8cC",
      "role": "admin",
      "deletedAt": null,
      "createdAt": "2023-11-15T23:12:24.672Z",
      "updatedAt": "2023-11-16T02:54:03.937Z",
      "__v": 3
    }
    ```

    ```

    ```

### 6. Delete User by ID

- **Description:** Endpoint to delete a user by their ID.
- **HTTP Method:** `DELETE`
- **Route:** `/users/:id`
- **Controller:** `userController.delete`
- **Received Data Types:**
  - `Request` (Express): Route parameter (`id`) specifying the user's ID to delete.
  - `Response` (Express): Not specified in the code, usually used to send the HTTP response.

### 7. Get Users by Group

- **Description:** Endpoint to get all users belonging to a group.
- **HTTP Method:** `GET`
- **Route:** `/groups/:id/users`
- **Controller:** `userController.getUsersByGroup`
- **Received Data Types:**
  - `Request` (Express): Route parameter (`id`) specifying the group's ID.
  - `Response` (Express): Not specified in the code, usually used to send the HTTP response.

## Group Routes

### 1. Create Group

- **Description:** Endpoint to create a new group.
- **HTTP Method:** `POST`
- **Route:** `/groups`
- **Controller:** `groupController.create`
- **Received Data Types:**

  - `Request` (Express): Request body must contain the data of the group to be created.

  ```json
  {
    "name": "Grupo3"
  }
  ```

### 2. Get All Groups

- **Description:** Endpoint to get all groups.
- **HTTP Method:** `GET`
- **Route:** `/groups
- **Controller:** `groupController.getAll`
- **Received Data Types:**
  - `Request` (Express): No data expected in the request.
  - `Response` (Express): Not specified in the code, usually used to send the HTTP response.

### 3. Get Group by ID

- **Description:** Endpoint to get a group by its ID.
- **HTTP Method:** `GET`
- **Route:** `/groups/:id`
- **Controller:** `groupController.getOne`
- **Received Data Types:**

  - `Request` (Express): Route parameter (`id`) specifying the group's ID.
  - `Response` (Express): Not specified in the code, usually used to send the HTTP response.

    ```json
    {
      "_id": "65558da4d2d266e2ba77bf6a",
      "name": "Grupo2",
      "users": ["65558cfcd2d266e2ba77bf55", "65558d08d2d266e2ba77bf58"],
      "deletedAt": null,
      "createdAt": "2023-11-16T03:33:56.073Z",
      "updatedAt": "2023-11-16T03:37:41.669Z",
      "__v": 2
    }
    ```

### 4. Update Group by ID

- **Description:** Endpoint to update a group by its ID.
- **HTTP Method:** `PUT`
- **Route:** `/groups/:id`
- **Controller:** `groupController.update`
- **Received Data Types:**
  - `Request` (Express): Route parameter (`id`) specifying the group's ID to update. Request body must contain the new group data.
    ```typescript
    interface UpdateGroupRequest {
      // New properties of the group
    }
    ```

### 5. Delete Group by ID

- **Description:** Endpoint to delete a group by its ID.
- **HTTP Method:** `DELETE`
- **Route:** `/groups/:id`
- **Controller:** `groupController.delete`
- **Received Data Types:**
  - `Request` (Express): Route parameter (`id`) specifying the group's ID to delete.
  - `Response` (Express): Not specified in the code, usually used to send the HTTP response.

### 6. Get Groups by User

- **Description:** Endpoint to get all groups a user belongs to.
- **HTTP Method:** `GET`
- **Route:** `/users/:id/groups`
- **Controller:** `groupController.getGroupsByUser`
- **Received Data Types:**
  - `Request` (Express): Route parameter (`id`) specifying the user's ID.
  - `Response` (Express): Not specified in the code, usually used to send the HTTP response.
