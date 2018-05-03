var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

var uri = process.env.MONGO_URI;

MongoClient.connect(uri, function(err, client) {
  if (err) throw err;
  const db = client.db('software-bytes');

  db.listCollections().toArray(function(err, collInfos) {
    // collInfos is an array of collection info objects that look like:
    // { name: 'test', options: {} }
    collInfos.forEach(collection => console.log(collection.name));
  
    client.close();
  });
});