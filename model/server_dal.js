var mysql = require('mysql');
var db = require('./db_connection');

/* Connect to Database */
var connection = mysql.createConnection(db.config);

/* Get all the games */
exports.getAll = function(callback){
    var query = 'SELECT * FROM ServerInfo';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getGames = function(callback){
    var query = 'CALL getGameInfo()';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getByName = function(server_ip, callback){
    var query = 'SELECT * FROM ServerInfo WHERE server_IP = ?';
    var queryData = [server_ip];
    connection.query(query, queryData, function(err ,result){
        callback(err , result);
    });
};

exports.insert = function(params, callback){
  var query = 'INSERT INTO game_server (server_IP, server_name, server_status, dev_name_server, game_name_server) VALUES (?,?,?,?,?)';
  var queryData = [params.server_ip, params.server_name, params.server_status, params.dev_name_server, params.game_name_server];
  connection.query(query,queryData,function(err, result){
     callback(err, result);
  });
};

exports.delete = function(server_ip, callback) {
    var query = 'DELETE FROM game_server WHERE server_IP = ?';
    var queryData = [server_ip];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};