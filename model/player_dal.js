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
    var query = 'SELECT * FROM PlayingGame WHERE player_ID = ?';
    var queryData = [player_id];
    connection.query(query, queryData, function(err ,result){
        callback(err , result);
    });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO player (username, player_status) VALUES (?,?)';
    var queryData = [params.username, params.player_status];
    connection.query(query,queryData,function(err, result){
        callback(err, result);
    });
};

exports.delete = function(player_id, callback) {
    var query = 'DELETE FROM player WHERE player_ID = ?';
    var queryData = [player_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE player SET player_status = ? WHERE player_ID = ?';
    var queryData = [params.player_status, params.player_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};
