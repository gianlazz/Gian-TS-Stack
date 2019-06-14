import { useContainer } from "class-validator";
import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { Container } from "typedi";
import { createDockerDbConnection } from "./deploymentConfigs/createDockerDbConnection";
import { createLocalDevDbConnection } from "./deploymentConfigs/createLocalDevDbConnection";
import { envVariablesConfigured } from "./deploymentConfigs/envChecker";
import * as graphqlApi from "./graphQL/graphqlApi";
import https from "https";
import fs from "fs";

import cookieParser = require("cookie-parser");
console.log("starting server");
useContainer(Container);

const app = express();
// Configure Express to parse incoming JSON data
app.use( express.json() );

app.use(cookieParser());

let allowedOrigins = [];
let corsOptions = {}

const port = process.env.PORT;

console.log(port);
// initialize configuration
if (process.env.NODE_ENV === "docker") {
// DEPLOYMENT CONFIGURATION
    if (!envVariablesConfigured()) {
        throw new Error(("Missing required environment variables!"));
    }

    console.log("Connecting to docker db.");
    createDockerDbConnection()
    .then((connection) => console.log("Connected to docker Postgres with TypeORM."))
    .catch((error) => console.log(error));

    // start https server
    let sslOptions = {
        key: fs.readFileSync('/ssl/key.key').toString(),
        cert: fs.readFileSync('/ssl/cert.pem').toString()
    };

    if (!sslOptions.cert || !sslOptions.key) {
        console.error("SSL files not setup correctly!");
    } else {
        console.log(sslOptions);
    }

    // Configure Express to allow Cross Origin Scripting so server and client can communicate during dev
    allowedOrigins = [
        "capacitor://localhost",
        "ionic://localhost",
        "http://localhost",
        "http://localhost:8080",
        "http://localhost:8100",
        "http://localhost:8101"
    ];

    corsOptions = {
        // origin: "http://localhost:8100",
        origin: true,
        credentials: true
    };

    // Register GraphQL setup middleware
    graphqlApi.register( app, corsOptions );

    let serverHttps = https.createServer(sslOptions, app).listen(443);
} else {
// DEV CONFIGURATION
    dotenv.config();
    // port is now available to the Node.js runtime
    // as if it were an enviroment variable
    const port = process.env.PORT;
    
    if (!envVariablesConfigured()) {
        throw new Error(("Missing required environment variables!"));
    }
// Typeorm connection
    console.log("Connecting to local db.");
    createLocalDevDbConnection()
    .then((connection) => console.log("Connected to default ormconfig.json database with TypeORM."))
    .catch((error) => console.log(error));

    // Configure Express to allow Cross Origin Scripting so server and client can communicate during dev
    allowedOrigins = [
        "capacitor://localhost",
        "ionic://localhost",
        "http://localhost",
        "http://localhost:8080",
        "http://localhost:8100",
        "http://localhost:8101"
    ];

    corsOptions = {
        // origin: "http://localhost:8100",
        origin: true,
        credentials: true
    };

    // Register GraphQL setup middleware
    graphqlApi.register( app, corsOptions );

    // start the Express server
    app.listen( port, () => {
        console.log( `Server started at http://localhost:${ port }` );
        console.log(`Running a GraphQL API server at http://localhost:${ port }/graphql`);
    } );
}
