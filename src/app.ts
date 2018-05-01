var express = require('express');
var graphqlHTTP = require('express-graphql');

import { SchemaBuilder } from "./schema/schema";
import { JsonStore } from './drivers/json-store';
import * as cors from 'cors';
import { Response, Request } from "express";

const isProd = process.env.NODE_ENV == 'production' ? true : false;

var app = express();

const dataStore = new JsonStore();

app.use(cors());

app.use('/api', graphqlHTTP({
  schema: SchemaBuilder.buildSchema(dataStore),
  graphiql: !isProd,
}));

app.post('/auth0/registerUser', (req: Request, res: Response) => {
  console.log(req.body.json());
  res.sendStatus(200);
})

app.get('/', (req, res) => res.send('Welcome to the 617 API'));

app.listen(process.env.PORT || 4000, () => console.log('API running! prod = ', isProd));
