var mysql = require('mysql');
var db = require('./db_connection');

/* Connect to Database */
var connection = mysql.createConnection(db.config);

/* Get all the developers */
exports.getAll = function(callback){
    var query = 'SELECT * FROM developer';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getByName = function(dev_name, callback){
  var query = 'CALL devInfo(?)';
  var queryData = [dev_name];
  connection.query(query, queryData, function(err ,result){
     callback(err , result);
  });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO developer (dev_name, num_employees, rating, email) VALUES (?,?,?,?)';
    var queryData = [params.dev_name, params.num_employees, params.rating, params.email];
    connection.query(query,queryData,function(err, result){
        callback(err, result);
    });
};

exports.delete = function(dev_name, callback) {
    var query = 'DELETE FROM developer WHERE dev_name = ?';
    var queryData = [dev_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};
