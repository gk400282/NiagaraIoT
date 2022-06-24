const http = require("http");
const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();
var bodyParser = require('body-parser');
const { result } = require("lodash");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
const server = http.createServer(app);
var dbConn = require("./DbConnector").DbConnector;

var db;
db = new dbConn();
db.initializeDb();

var port = process.env.PORT || 8009;
server.listen(port, function (err) {
  console.log("Listening to port " + port);
});

app.get('/', function (req, res) {
  console.log("******************");
  res.send('We are happy to see you');
});

app.post('/', function (req, res) {
  console.log("****************** POST request ***********" + JSON.stringify(req));
});

app.get('/cleandb', function(req, res) {
  console.log("Delete all data request received");
  db.removeAll((err, result) => {
    console.log("Result: " + JSON.stringify(result));
    if (err)
    {
      res.send("Failed to delete database.");
    }
    else
    {
      res.send("Database deletion successful.");
    }
  })
});

app.get('/points', function (req, res) {
  console.log("***********getallpoints*******");
  db.fetchAll((err, result) => {
    console.log("All details" + JSON.stringify(result));
    res.render('points', {
      points: result
    });
  })
});

app.get('/api/points', function (req, res) {
  console.log("***********getallpoints*******");
  db.fetchAll((err, result) => {
    console.log("details" + JSON.stringify(result));
    res.send(result);
  })
});

app.post('/injest', function (req, res) {

  console.log("****************** recieved body ***********" + JSON.stringify(req.body));
  console.log("****************** recieved header ***********" + JSON.stringify(req.headers));
  if (req.body.point) {
    db.updateDb(req.body.point, () => {
      db.fetchDb({ "point_id": req.body.point.point_id }, (err, result) => {
        console.log("Point details: " + JSON.stringify(result));
      })
    });
    res.redirect("/points");
  }
  else {
    res.send("Point not sent");
  }

});