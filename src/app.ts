var express = require('express');
var graphqlHTTP = require('express-graphql');
var bodyParser = require("body-parser");

import { SchemaBuilder } from "./schema/schema";
import * as cors from 'cors';
import { MongoConnector } from "./drivers/mongo-connector";
import { Response, Request } from "express";

const isProd = process.env.NODE_ENV == 'production' ? true : false;

var app = express();

const dataStore = new MongoConnector();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api', graphqlHTTP({
  schema: SchemaBuilder.buildSchema(dataStore),
  graphiql: !isProd,
}));

app.post('/auth0/registerUser', (req: Request, res: Response) => {
  console.log(req.body);
  res.sendStatus(200);
})

app.get('/', (req, res) => res.send('Welcome to the 617 API'));

app.listen(process.env.PORT || 4000, () => console.log('API running! prod = ', isProd));
