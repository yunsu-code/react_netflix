const express = require('express');
const path = require('path');
const app = express();

const http = require('http').createServer(app);
http.listen(3000, function () {
  console.log('listening on 3000')
}); 

module.exports = app;