var socket = null;
var lastKeyCode = 0;
var lastMouseClick = false;

$(document).ready(function () {
    socket = io();
    console.log("ready!");

    // $('.button-circle').click(function (e) {
    //     e.preventDefault(); // prevents page reloading
    //     let directionCode = $(this)[0].innerHTML;
    //     socket.emit('front-control', directionCode);
    //     console.log(`CONTROL DIRECTION: ${directionCode} sent!`);
    //     return false;
    // });

    $('.button-circle').on('mousedown', function () {
        lastMouseClick = true;

        let directionCode = $(this)[0].innerHTML;
        socket.emit('front-control-start', directionCode);
        console.log(`CONTROL START: ${directionCode} sent!`);
    }).on('mouseup', function () {
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
    socket.emit('front-route', $("#route-textarea").val());
}
function stopRoute() {
    socket.emit('front-route', "stop");
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
        $("#route-textarea").val($("#route-textarea").val() + directionCode);
        $btnASDW.removeClass("active");
        socket.emit('front-control-end', directionCode);
        //$btnASDW.trigger("click");
    }
}