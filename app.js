var router = require("./router").load;
require("http").createServer(function(req, res) {
  // consolidated all router calls into one
  router(req, res);
}).listen(1337, '127.0.0.1');
console.log("localhost running at 1337");
