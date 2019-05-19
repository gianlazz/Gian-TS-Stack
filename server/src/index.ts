import { useContainer } from "class-validator";
import cookieParser = require("cookie-parser");
import cors = require("cors");
import dotenv from "dotenv";
import express from "express";
import path from "path";
import "reflect-metadata";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import { createDockerDbConnection } from "./deploymentConfigs/createDockerDbConnection";
import { createLocalDevDbConnection } from "./deploymentConfigs/createLocalDevDbConnection";
import * as graphqlApi from "./graphQL/graphqlApi";
import { envVariablesConfigured } from "./deploymentConfigs/envChecker";

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
    "http://localhost:8100"
  ];

const corsOptions = {
    origin: "http://localhost:8100",
    credentials: true
};

console.log("NODE_ENV: " + process.env.NODE_ENV);
// initialize configuration
if (process.env.DEPLOYMENT === "Heroku") {
// Typeorm connection
    console.log("Connecting to heroku db.");
    createHerokuDbConnection()
    .then((connection) => console.log("Connected to heroku Postgres with TypeORM."))
    .catch((error) => console.log(error));
} else if (process.env.NODE_ENV === "docker") {
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
    throw("Missing required environment variables!");
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
