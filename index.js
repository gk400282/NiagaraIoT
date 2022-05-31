const http = require("http");
const fs = require("fs");

const express = require("express");

const app = express();
// app.listen(4000, () => {
//     console.log('server is runing at pport 4000')
// });

http
  .createServer(

    app
  )
  .listen(4000, () => {
    console.log("serever is runing at port 4000");
  });
  app.get('/', (req,res)=>{
    res.send("Hello from express server.")
})