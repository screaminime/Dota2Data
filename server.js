var express = require('express');
var app = express();
var Datastore = require('nedb');
var db = new Datastore({
  filename: 'db/DotaMatches.db',
  autoload: true
});
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
app.use(express.static('public'));
var unirest = require('unirest');



var server = app.listen(process.env.PORT);
db.ensureIndex({ fieldName: 'id', unique: true });

unirest.get('https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/')
  .query({
    key: process.env.STEAM_API_KEY
  })
  .header('Accept', 'application/json').end(function(response) {
    var heroList = response.body.result.heroes;
    //I can get the data


    db.insert(heroList, function(err, newHeroes) {
      //I can find it in the DB (but i can not see it or consolelog it)

    });
    //I can put it in the DB


  });
app.get('/api/heroes', function(req, res) {
  db.find({}).sort({id:1}).exec(function(err, heroes) {
    res.jsonp(heroes);
  });
});

app.get('/api/heroes/:id', function(req, res) {
  db.findOne({id: parseInt(req.params.id)}, function(err, hero) {
    res.jsonp(hero);
  });
});

app.get('/heroes', function(req, res){
  res.render('heroes',{name:"bob", candies:["pop","rocks","snicker","doodle"]});
});
