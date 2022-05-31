const http = require("http");
const fs = require("fs");

const express = require("express");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const server = http.createServer(app);

// http
//   .createServer(

//     app
//   )
//   .listen(4000, () => {
//     console.log("serever is runing at port 4000");
//   });
var port = process.env.PORT || 8090;
server.listen(port,function (err) {
    console.log("Listening to port "+port);
});

app.get('/',function(req,res){
    console.log("******************");
    res.send('We are happy to see you');
  });
  app.post('/',function (req,res) {

    console.log("****************** POST request ***********"+JSON.stringify(req));

});