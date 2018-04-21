var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

var uri = process.env.MONGO_URI;

MongoClient.connect(uri, function(err, client) {
  if (err) throw err;
  
  const db = client.db('software-bytes');

  db.createCollection("tables", function(err, res) {
    if (err) throw err;
    client.close();
  })
});