var express = require('express');
var graphqlHTTP = require('express-graphql');

import { SchemaBuilder } from "./schema/schema";
import { JsonStore } from './drivers/json-store';
import * as dotenv from 'dotenv';

dotenv.config();
const isProd = process.env.NODE_ENV == 'production' ? true : false;

var app = express();

const dataStore = new JsonStore();

app.use('/', graphqlHTTP({
  schema: SchemaBuilder.buildSchema(dataStore),
  graphiql: !isProd,
}));

app.listen(process.env.PORT || 4000, () => console.log('API running! prod = ', isProd));
