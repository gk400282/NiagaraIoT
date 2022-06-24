sqlite3 = require('sqlite3');
var _ = require('lodash');

function dbConnector() {
    var pointDb;
    pointDb = new sqlite3.Database("./points.db");

    function initializeDb() {

        console.log("initialize db *********");

        pointDb.run("CREATE TABLE IF NOT EXISTS pointInfo (point_id Text PRIMARY KEY,point_name Text," +
            "outvalue TEXT)");

    }

    function updateDb(point, callback) {
        console.log("updating the db with details " + JSON.stringify(point));
        var cb = function (err) {
            if (err) {
                console.log("Error occured during updating database: " + err);
            }
            callback(err);
        }
        pointDb.run("INSERT into pointInfo(point_id,point_name,outvalue) VALUES (?,?,?)", point.point_id, point.point_name, point.outvalue, cb);
    }

    function fetchDb(point, callback) {
        console.log("Fetching from db with details " + JSON.stringify(point));
        var cb = function (err, results) {
            if (err) {
                console.log("Error occured during fetch: " + err);
            }
            if (results.length == 0) {
                err = 400;
            }
            callback(err, results);
        }
        pointDb.all("SELECT * from pointInfo WHERE point_id=?", point.point_id, cb);
    }

    function fetchAll(callback) {
        var cb = function (err, results) {

            if (results.length == 0) {
                console.log("error occured in fetch" + err + "     " + results);
                err = 400;
            }
            callback(err, results);
        }
        pointDb.all("SELECT * from pointInfo", cb);
    }

    function removeAll(callback) {
        console.log("Removing all data from database.");
        var cb = function (err, results) {
            if (err) {
                console.log("Error occured while deleting database: " + err);
            }
            callback(err, results);
        }
        pointDb.all("DELETE from pointInfo", cb);
    }

    function closeDb(callback) {
        pointDb.close();
        callback();
    }

    return {
        initializeDb: initializeDb,
        updateDb: updateDb,
        closeDb: closeDb,
        fetchDb: fetchDb,
        fetchAll: fetchAll,
        removeAll: removeAll
    }

}

exports.DbConnector = dbConnector;