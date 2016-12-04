var mysql = require('mysql');
var db = require('./db_connection');

/* Connect to Database */
var connection = mysql.createConnection(db.config);

/* Get all the games */
exports.getAll = function(callback){
    var query = 'SELECT * FROM game_server';
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
