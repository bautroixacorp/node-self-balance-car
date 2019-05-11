var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// serve static folder
app.use(express.static('public'))

// index
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// socket-connection
io.on('connection', function (socket) {
    console.log('CONNECTED!');
    socket.on('send-control', function (direction) {
        socket.broadcast.emit('receive-control', direction);
        console.log('send-control: ' + direction);
    });
    socket.on('disconnect', function () {
        console.log('DISCONNECTED!');
    });
});

// listion on port
http.listen(process.env.PORT || 3000, function () {
    console.log('Server running on port 3000...');
});

