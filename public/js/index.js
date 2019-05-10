var tabs = ["control", "route"]

function onload() {
    // hide other tab
    tabs.forEach((tab) => {
        if (tab != tabs[0]) {
            $("#" + tab).hide();
        }
    })
    // first tab is active
    $(`#${tabs[0]}-tabbtn`).addClass("active-tab-btn");
}

function openTab(evt, tabName) {
    // hide other tab
    tabs.forEach((tab) => {
        if (tab != tabName) {
            $("#" + tab).hide();
            $("#" + tab + "-tabbtn").removeClass("active-tab-btn");
        }
    })
    // show tab and set active
    $("#" + tabName).show();
    $(evt).addClass("active-tab-btn");

}

$(document).ready(function () {
    keyPressHandler();

    console.log("ready!");
    var socket = io();
    $('.button-circle').click(function (e) {
        e.preventDefault(); // prevents page reloading
        let directionCode = $(this)[0].innerHTML;
        socket.emit('control', directionCode);
        console.log(`CONTROL DIRECTION: ${directionCode} sent!`);
        return false;
    });
});

// keyboard.js
var key_interval;
var key_called = false;
function keyDownAction(keyCode) {
    var $btnASDW = null;
    switch (keyCode) {
        case 65: $btnASDW = $(".button-L"); break;//A
        case 83: $btnASDW = $(".button-D"); break;//S
        case 68: $btnASDW = $(".button-R"); break;//D
        case 87: $btnASDW = $(".button-U"); break;//W
    }
    $btnASDW.addClass("active");
}
function keyUpAction(keyCode) {
    var $btnASDW = null;
    switch (keyCode) {
        case 65: $btnASDW = $(".button-L"); break;//A
        case 83: $btnASDW = $(".button-D"); break;//S
        case 68: $btnASDW = $(".button-R"); break;//D
        case 87: $btnASDW = $(".button-U"); break;//W
    }
    $btnASDW.removeClass("active");
    $btnASDW.trigger("click");
}
function keyPressHandler() {
    $(document).on('keydown', function (e) {
        keyDownAction(e.keyCode);
    }).on('keyup', function (e) {
        keyUpAction(e.keyCode);
    });
}