var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project 2 Game Servers', description: 'This website will contain a list of game servers and information related to game servers.' });
});

router.get('/about', function(req, res, next){
  res.render('about');
});

module.exports = router;
