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


    function updateDb(point,callback) {
        console.log("updating the db with details "+JSON.stringify(point));
        var cb = function (err) {
            console.log("error occured" +err);
            callback(err);
        }
        pointDb.run("INSERT into pointInfo(point_id,point_name,outvalue) VALUES (?,?,?)",point.point_id,point.point_name,point.outvalue,cb);
    }

    function fetchDb(point,callback) {
        console.log("Fetching from db with details "+JSON.stringify(point));
        var cb = function (err, results) {
            console.log("error occured in fetch" +err+ "     " +results );
            if(results.length == 0){
                err = 400;
            }
            callback(err, results);
        }
        pointDb.all("SELECT * from pointInfo WHERE point_id=?", point.point_id,cb);
    }


    function closeDb(callback) {
       

             pointDb.close(); 
            callback();
       
    }

    return {
        initializeDb : initializeDb,
        updateDb : updateDb,
        closeDb : closeDb,
        fetchDb : fetchDb,
    }

}

exports.DbConnector = dbConnector;