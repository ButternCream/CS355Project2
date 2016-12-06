var mysql = require('mysql');
var db = require('./db_connection');

/* Connect to Database */
var connection = mysql.createConnection(db.config);

/* Get all the games */
exports.getAll = function(callback){
    var query = 'SELECT * FROM game';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getByName = function(dev_name, game_name, callback){
    var query = 'SELECT * FROM game WHERE game_name = ? AND dev_name = ?';
    var queryData = [game_name, dev_name];
    connection.query(query, queryData, function(err ,result){
        callback(err , result);
    });
};


exports.insert = function(params, callback){
    var query = 'INSERT INTO game (dev_name, game_name, game_type, num_players, version, rating) VALUES (?,?,?,?,?,?)';
    var queryData = [params.dev_name, params.game_name, params.game_type, params.num_players, params.version, params.rating];
    connection.query(query,queryData,function(err, result){
        callback(err, result);
    });
};

exports.delete = function(game_name, dev_name, callback) {
    var query = 'DELETE FROM game WHERE game_name = ? AND dev_name = ?';
    var queryData = [game_name, dev_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};
