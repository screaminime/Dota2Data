var express = require('express');
var app = express();
var Datastore = require('nedb');
var db = new Datastore({ filename: 'db/DotaMatches.db', autoload: true });

app.get('/', function(req, res){
  res.send('Hello World');
});

var server = app.listen(3000);
