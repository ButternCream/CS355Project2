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


module.exports = router;
