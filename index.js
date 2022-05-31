const https = require("https");
const fs = require("fs");

const express = require("express");

const app = express();
// app.listen(4000, () => {
//     console.log('server is runing at pport 4000')
// });

https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(4000, () => {
    console.log("serever is runing at port 4000");
  });
  app.get('/', (req,res)=>{
    res.send("Hello from express server.")
})