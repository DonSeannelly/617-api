var express = require('express');
var graphqlHTTP = require('express-graphql');

import { SchemaBuilder } from "./schema/schema";
import { JsonStore } from './drivers/json-store';
import * as cors from 'cors';
import { Response } from "express";

const isProd = process.env.NODE_ENV == 'production' ? true : false;

var app = express();

const dataStore = new JsonStore();

app.use(cors());

app.use('/', graphqlHTTP({
  schema: SchemaBuilder.buildSchema(dataStore),
  graphiql: !isProd,
}));

app.post('/auth0/registerUser', (req, res: Response) => {
  console.log(req.body.json());
  res.sendStatus(200);
})

app.listen(process.env.PORT || 4000, () => console.log('API running! prod = ', isProd));
