var express = require('express');
var router = express.Router();
var game_dal = require('../model/game_dal');

router.get('/all', function(req, res){
    game_dal.getAll(function(err, result){
        if (err){
            res.send(err);
        } else {
            res.render('game/gameViewAll', { 'result': result });
        }
    });
});

router.get('/', function(req, res){
    if(req.query.game_name == null || req.query.dev_name == null) {
        res.send('dev_name or game_name is null');
    }
    else {
        game_dal.getByName(req.query.dev_name, req.query.game_name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('game/gameByName', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    game_dal.getDevs(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('game/gameAdd', {'dev': result[1]});
        }
    });
});

router.get('/insert', function(req, res){
    if (req.query.dev_name == null){
        res.send('dev_name is null');
    }
    else if (req.query.game_name == null){
        res.send('game_name is null');
    }
    else if (req.query.game_type == null){
        res.send('game_type is null');
    }
    else if (req.query.num_players == null){
        res.send('num_players is null');
    }
    else if (req.query.version == null){
        res.send('version is null');
    }
    else if (req.query.rating == null){
        res.send('rating is null');
    }
    else{
        game_dal.insert(req.query, function(err, result){
            if (err){
                res.send(err);
            }
            else{
                res.redirect(302, '/game/all');
            }
        });
    }

});

router.get('/delete', function(req, res){
    if(req.query.game_name == null) {
        res.send('game_name is null');
    }
    else if(req.query.dev_name == null) {
        res.send('dev_name is null');
    }
    else {
        game_dal.delete(req.query.game_name, req.query.dev_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/game/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.dev_name == null) {
        res.send('A dev name is required');
    }
    if(req.query.game_name == null) {
        res.send('A game name is required');
    }
    else {
        game_dal.getByName(req.query.dev_name, req.query.game_name, function(err, result){
            //console.log(result);
            res.render('game/gameUpdate', {'game': result[0]});
        });
    }

});

router.get('/update', function(req, res) {
    game_dal.update(req.query, function(err, result){
        res.redirect(302, '/game/all');
    });
});

module.exports = router;