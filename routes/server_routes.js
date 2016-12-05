var express = require('express');
var router = express.Router();
var server_dal = require('../model/server_dal');

router.get('/all', function(req, res){
    server_dal.getAll(function(err, result){
        if (err){
            res.send(err);
        } else {
            res.render('server/serverViewAll', { 'result': result });
        }
    });
});

router.get('/', function(req, res){
    if(req.query.server_ip == null) {
        res.send('server_ip is null');
    }
    else {
        server_dal.getByName(req.query.server_ip, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('server/serverByIp', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    server_dal.getGames(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('server/serverAdd', {'games': result});
        }
    });
});

router.get('/insert', function(req, res){
   if (req.query.server_ip == ""){
       res.send('server_ip is null');
   }
   else if (req.query.server_name == ""){
       res.send('server_name is null');
   }
   else if (req.query.server_status == null){
       res.send('server_status is null');
   }
   else if (req.query.dev_name_server == null){
       res.send('dev_name_server is null');
   }
   else if (req.query.game_name_server == null){
       res.send('game_name_server is null');
   }
   else{
       server_dal.insert(req.query, function(err, result){
          if (err){
              res.send(err);
          }
          else{
              res.redirect(302, '/server/all');
          }
       });
   }

});

router.get('/delete', function(req, res){
    if(req.query.server_ip == null) {
        res.send('server_ip is null');
    }
    else {
        server_dal.delete(req.query.server_ip, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/server/all');
            }
        });
    }
});

module.exports = router;
