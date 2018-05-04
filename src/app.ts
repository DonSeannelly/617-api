var express = require('express');
var graphqlHTTP = require('express-graphql');
var bodyParser = require("body-parser");

import { SchemaBuilder } from "./schema/schema";
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import { MongoConnector } from "./drivers/mongo-connector";
import { Response, Request } from "express";
import { enforceTokenAccess } from "./drivers/jwt";
import { login, register } from "./interactors/AuthenticationInteractor";
import { ResponseFactory } from "./drivers/ResponseFactory";

// =====================================================================
//                               Config
// =====================================================================

const isProd = process.env.NODE_ENV == 'production' ? true : false;
const port = process.env.PORT || 4000;

const dataStore = new MongoConnector();
const responseFactory = new ResponseFactory();

var app = express();

app.use(cors({origin: true, credentials: true}));
app.use(cookieParser());
app.use(logger('dev'));

app.use(enforceTokenAccess);
app.use((error: any, req: any, res: any, next: any) => {
  if (error.name === 'UnauthorizedError') {
    res.status(401).send('Invalid Access Token');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// =====================================================================
//                              GraphQL
// =====================================================================

app.use('/api', graphqlHTTP(async (request, response, graphQLParams) => ({
  schema: SchemaBuilder.buildSchema(dataStore),
  context: { request },
  graphiql: !isProd,
})));

app.post('/users', async (req, res) => {
  await register(
    dataStore,
    responseFactory.buildResponder(res),
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.password
  );
})

app.post('/users/tokens', async (req, res) => {
  await login(
    dataStore,
    responseFactory.buildResponder(res),
    req.body.email,
    req.body.password
  );
});

app.get('/users/tokens', async (req, res) => {
  res.status(200).json(req['user']);
});

app.listen(port, () => console.log(`API is running on port ${port}`));
