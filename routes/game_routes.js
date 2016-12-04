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


module.exports = router;