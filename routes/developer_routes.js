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
                res.render('developer/developerByName', {'result': result[0]});
            }
        });
    }
});


router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    developer_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('developer/developerAdd', {'dev': result[0]});
        }
    });
});

router.get('/insert', function(req, res){
    if (req.query.dev_name == ""){
        res.send('dev_name is null');
    }
    else if (req.query.num_employees == ""){
        res.send('num_employees is null');
    }
    else if (req.query.rating == null){
        res.send('rating is null');
    }
    else if (req.query.email == null){
        res.send('email is null');
    }
    else{
        developer_dal.insert(req.query, function(err, result){
            if (err){
                res.send(err);
            }
            else{
                res.redirect(302, '/developer/all');
            }
        });
    }

});

router.get('/delete', function(req, res){
    if(req.query.dev_name == null) {
        res.send('dev_name is null');
    }
    else {
        developer_dal.delete(req.query.dev_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/developer/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.dev_name == null) {
        res.send('A dev name is required');
    }
    else {
        developer_dal.getByName(req.query.dev_name, function(err, result){
            //console.log(result);
            res.render('developer/developerUpdate', {'dev': result[0]});
        });
    }

});

router.get('/update', function(req, res) {
    developer_dal.update(req.query, function(err, result){
        res.redirect(302, '/developer/all');
    });
});

module.exports = router;