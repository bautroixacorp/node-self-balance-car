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

var outPing = [];
var nextPing = setTimeout(() => { }, 0);
var robotIDs = [];

// socket-connection
io.on('connection', function (socket) {
    let clientID = socket.id;
    outPing[clientID] = setTimeout(() => { }, 0);

    console.log(`${clientID} is CONNECTED!`);

    // STREAM PING
    socket.on('web-ping', function (ping) {
        console.log("ping");
        clearTimeout(outPing[clientID]);
        io.sockets.emit('robot-ping', Date.now());
    });

    socket.on('robot-res-ping', function (ping) {
        console.log("robot-res-ping");
        clearTimeout(outPing[clientID]);
        io.sockets.emit('web-res-ping-value', `${clientID}:${Date.now() - ping}`);
        // next ping
        setTimeout(() => {
            io.sockets.to(clientID).emit('robot-ping', Date.now());
            outPing[clientID] = setTimeout(() => {
                io.sockets.emit('web-res-ping-value', `${clientID}:OFFLINE`);
            }, 5000);
        }, 1000);
    });

    // STREAM WEBCAM
    socket.on('robot-res-webcam', function (img64) {
        io.sockets.emit('web-livecam', img64);
    });

    // CONTROL CONFIG P/I/D
    socket.on('web-config', function (config) {
        console.log(`web => config: `, config);
        io.sockets.emit('robot-config', config);
    });

    // CONTROL CAMERA ON/OFF
    socket.on('web-control-camera', function (onOFF) {
        console.log(`web => turn ${onOFF ? 'on' : 'off'} camera`);
        io.sockets.emit('robot-ctrl-cam', onOFF);
    });

    // CONTROL LEFT/RIGHT UP/DOWN
    socket.on('web-control-start', function (direction) {
        socket.broadcast.emit('robot-control-start', direction);
        console.log('web => control start: ' + direction);
    });
    socket.on('web-control-end', function (direction) {
        socket.broadcast.emit('robot-control-end', direction);
        console.log('web => control end:' + direction);
    });

    // CONTROL WITH CUSTOM ROUTE
    socket.on('web-route', function (route) {
        socket.broadcast.emit('robot-route', route);
        console.log('web => route: ' + route);

    });

    socket.on('disconnect', function () {
        console.log(`${clientID} is DISCONNECTED!`);
    });
});

// listion on port
http.listen(process.env.PORT || 3000, function () {
    console.log('Server running on port 3000...');
});

