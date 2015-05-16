var express = require('express');
var app = express();
var Datastore = require('nedb');
var db = new Datastore({ filename: 'db/DotaMatches.db', autoload: true });

app.get('/', function(req, res){
  res.send('Hello New World');
});

var server = app.listen(process.env.PORT || 3000);
