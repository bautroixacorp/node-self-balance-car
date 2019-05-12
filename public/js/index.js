const socket = io();
var lastKeyCode = 0;
var lastMouseClick = false;
var directs = {
    "W": "U",
    "D": "R",
    "S": "D",
    "A": "L"
};

function pingRes() {
    socket.emit('ping-res', 0);
}

$(document).ready(function () {
    console.log("ready!");


    socket.on('ping-value', function (value) {
        if (!isNaN(value)){
            $("#ping-value").html("Ping: "+value+ "ms");
        } else {
            $("#ping-value").html("OFFLINE");
        }
        
    });

    // mouse-click
    $('.button-circle').on('mousedown', function () {
        lastMouseClick = true;


        let directionCode = $(this)[0].innerHTML;
        $("#route-textarea").val($("#route-textarea").val() + directs[directionCode]);
        socket.emit('front-control-start', directionCode);
        console.log(`CONTROL START: ${directionCode} sent!`);
    }).on('mouseup', function () {
        lastMouseClick = false;
        let directionCode = $(this)[0].innerHTML;
        socket.emit('front-control-end', directionCode);
        console.log(`CONTROL END: ${directionCode} sent!`);
    }).on('mouseleave', function () {
        if (lastMouseClick) {
            lastMouseClick = false;
            let directionCode = $(this)[0].innerHTML;
            socket.emit('front-control-end', directionCode);
            console.log(`CONTROL END: ${directionCode} sent!`);
        }
    });

    // keypress
    $(document).on('keydown', function (e) {
        let keyCode = e.keyCode;
        if (keyCode != lastKeyCode) {
            keyDownAction(e.keyCode);
            lastKeyCode = keyCode;
        }
    }).on('keyup', function (e) {
        lastKeyCode = 0;
        keyUpAction(e.keyCode);
    });
});

function runRoute() {
    let routeStr = $("#route-textarea").val();
    console.log("ROUTE RUN: " + routeStr);
    socket.emit('front-route', routeStr);
}
function stopRoute() {
    socket.emit('front-route', "stop");
    console.log("ROUTE STOP");
}

// keyboard.js
function keyDownAction(keyCode) {
    let $btnASDW = null;
    switch (keyCode) {
        case 65: $btnASDW = $(".button-L"); break;//A
        case 83: $btnASDW = $(".button-D"); break;//S
        case 68: $btnASDW = $(".button-R"); break;//D
        case 87: $btnASDW = $(".button-U"); break;//W
    }
    if ($btnASDW != null) {
        $btnASDW.addClass("active");
        let directionCode = $btnASDW[0].innerHTML;
        console.log(`CONTROL START: ${directionCode} sent!`);
        socket.emit('front-control-start', directionCode);
    }
}
function keyUpAction(keyCode) {
    let $btnASDW = null;
    switch (keyCode) {
        case 65: $btnASDW = $(".button-L"); break;//A
        case 83: $btnASDW = $(".button-D"); break;//S
        case 68: $btnASDW = $(".button-R"); break;//D
        case 87: $btnASDW = $(".button-U"); break;//W
    }
    if ($btnASDW != null) {
        let directionCode = $btnASDW[0].innerHTML;
        $("#route-textarea").val($("#route-textarea").val() + directs[directionCode]);
        $btnASDW.removeClass("active");
        console.log(`CONTROL END: ${directionCode} sent!`);
        socket.emit('front-control-end', directionCode);
    }
}