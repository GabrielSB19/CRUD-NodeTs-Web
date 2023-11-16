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
