var express = require('express');
var router = express.Router();
var developer_dal = require('../model/developer_dal');

router.get('/all', function(req, res){
   developer_dal.getAll(function(err, result){
       if (err){
           res.send(err);
       } else {
           res.render('developer/devViewAll', { 'result': result });
       }
   });
});

router.get('/', function(req, res){
    if(req.query.dev_name == null) {
        res.send('dev_name is null');
    }
    else {
        developer_dal.getByName(req.query.dev_name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('developer/developerByName', {'result': result});
            }
        });
    }
});


module.exports = router;