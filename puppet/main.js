var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	  console.log('a user connected');
});

setInterval(() => {
	console.log('beat');
  io.emit('beat', {connection: 1});
}, 4000);

setInterval(() => {
	console.log('beat');
  io.emit('beat', {connection: 2});
}, 10000);

http.listen(3000, function(){
	  console.log('listening on *:3000');
});
