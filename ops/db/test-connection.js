var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

var uri = process.env.MONGO_URI;

MongoClient.connect(uri, function(err, client) {
  if (err) throw err;
  console.log('connection successful!');
  
  client.close();
});