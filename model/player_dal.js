var mysql = require('mysql');
var db = require('./db_connection');

/* Connect to Database */
var connection = mysql.createConnection(db.config);

/* Get all of the players */
exports.getAll = function(callback){
    var query = 'SELECT * FROM player';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getByName = function(player_id, callback){
    var query = 'SELECT * FROM player WHERE player_ID = ?';
    var queryData = [player_id];
    connection.query(query, queryData, function(err ,result){
        callback(err , result);
    });
};

