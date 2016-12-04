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


module.exports = router;