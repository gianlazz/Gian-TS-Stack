import "reflect-metadata";

import { useContainer } from "class-validator";
import cookieParser = require("cookie-parser");
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { Container } from "typedi";
import { createDockerDbConnection } from "./deploymentConfigs/createDockerDbConnection";
import { createLocalDevDbConnection } from "./deploymentConfigs/createLocalDevDbConnection";
import { envVariablesConfigured } from "./deploymentConfigs/envChecker";
import * as graphqlApi from "./graphQL/graphqlApi";
console.log("starting server");
useContainer(Container);

const app = express();
// Configure Express to parse incoming JSON data
app.use( express.json() );

app.use(cookieParser());

// Configure Express to allow Cross Origin Scripting so server and client can communicate during dev
const allowedOrigins = [
    "capacitor://localhost",
    "ionic://localhost",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8100",
    "http://localhost:8101"
  ];

const corsOptions = {
    // origin: "http://localhost:8100",
    origin: true,
    credentials: true
};

// initialize configuration
if (process.env.NODE_ENV === "docker") {
    console.log("Connecting to docker db.");
    createDockerDbConnection()
    .then((connection) => console.log("Connected to docker Postgres with TypeORM."))
    .catch((error) => console.log(error));
} else {
    console.log("Connecting to local db.");
    dotenv.config();
// Typeorm connection
    createLocalDevDbConnection()
    .then((connection) => console.log("Connected to default ormconfig.json database with TypeORM."))
    .catch((error) => console.log(error));
}
if (!envVariablesConfigured()) {
    throw new Error(("Missing required environment variables!"));
}

// port is now available to the Node.js runtime
// as if it were an enviroment variable
const port = process.env.PORT;

// Configure Express to serve static files in the models folder for face-api.js
app.use("/models", express.static( path.join( __dirname, "/web/models" ) ) );

// Register GraphQL setup middleware
graphqlApi.register( app, corsOptions );

// start the Express server
app.listen( port, () => {
    console.log( `Server started at http://localhost:${ port }` );
    console.log(`Running a GraphQL API server at http://localhost:${ port }/graphql`);
 } );
