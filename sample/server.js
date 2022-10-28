var express = require('express');
var app = express();
var server = require('http').Server(app);

server.listen('9112', () => {
  console.log('起動しました', 'https://localhost:9112')
});

var JIFFServer = require('../lib/jiff-server.js');
var jiffServer = new JIFFServer(server, { logs:true });

console.log('Server is running on port 9111');