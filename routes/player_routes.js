var express = require('express');
var router = express.Router();
var player_dal = require('../model/player_dal');

router.get('/all', function(req, res){
    player_dal.getAll(function(err, result){
        if (err){
            res.send(err);
        } else {
            res.render('player/playerViewAll', { 'result': result });
        }
    });
});

router.get('/', function(req, res){
    if(req.query.player_id == null) {
        res.send('player_id is null');
    }
    else {

        player_dal.getByName(req.query.player_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('player/playerById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    player_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('player/playerAdd', {'players': result[0]});
        }
    });
});

router.get('/insert', function(req, res){
    if (req.query.username == null){
        res.send('username is null');
    }
    else if (req.query.player_status == null) {
        res.send('status is null');
    }
    else{
        player_dal.insert(req.query, function(err, result){
            if (err){
                res.send(err);
            }
            else{
                res.redirect(302, '/player/all');
            }
        });
    }

});

router.get('/delete', function(req, res){
    if(req.query.player_id == null) {
        res.send('player_id is null');
    }
    else {
        player_dal.delete(req.query.player_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/player/all');
            }
        });
    }
});

router.get('/update', function(req, res){
    if(req.query.player_id == null) {
        res.send('player_id is null');
    }
    else if(req.query.player_status == null) {
        res.send('player status is null');
    }
    else {
        player_dal.update(req.query, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/player/all');
            }
        });
    }
});

module.exports = router;