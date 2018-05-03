var express = require('express');
var graphqlHTTP = require('express-graphql');

import { SchemaBuilder } from "./schema/schema";
import * as cors from 'cors';
import { MongoConnector } from "./drivers/mongo-connector";

const isProd = process.env.NODE_ENV == 'production' ? true : false;

var app = express();

const dataStore = new MongoConnector();

app.use(cors());

app.use('/', graphqlHTTP({
  schema: SchemaBuilder.buildSchema(dataStore),
  graphiql: !isProd,
}));

app.listen(process.env.PORT || 4000, () => console.log('API running! prod = ', isProd));
