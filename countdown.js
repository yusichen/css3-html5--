var window_width = 1024;
var window_height = 600;
var radius = 8;
var marginTop = 168;
var marginLeft = 24;

var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]

window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = window_width;
    canvas.height = window_height;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(
        function() {
            render(context);
            update();
        }, 50);
}

function getCurrentShowTimeSeconds() {
    var date = new Date();
    var ret = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

    return ret;
}

function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    if (nextSeconds != curSeconds) {
        if (parseInt(nextHours / 10) != parseInt(curHours / 10)) {
            addballs(marginLeft, marginTop, parseInt(curHours / 10));
        }
        if (parseInt(nextHours % 10) != parseInt(curHours % 10)) {
            addballs(marginLeft + 15 * (radius + 1), marginTop, parseInt(curHours % 10));
        }
        if (parseInt(nextMinutes / 10) != parseInt(curMinutes / 10)) {
            addballs(marginLeft + 39 * (radius + 1), marginTop, parseInt(curMinutes / 10));
        }
        if (parseInt(nextMinutes % 10) != parseInt(curMinutes % 10)) {
            addballs(marginLeft + 54 * (radius + 1), marginTop, parseInt(curMinutes % 10));
        }
        if (parseInt(nextSeconds / 10) != parseInt(curSeconds / 10)) {
            addballs(marginLeft + 78 * (radius + 1), marginTop, parseInt(curSeconds / 10));
        }
        if (parseInt(nextSeconds % 10) != parseInt(curSeconds % 10)) {
            addballs(marginLeft + 93 * (radius + 1), marginTop, parseInt(curSeconds % 10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= window_height - radius) {
            balls[i].y = window_height - radius;
            balls[i].vy = -Math.abs(balls[i].vy) * 0.75;
        }
    }
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + radius > 0 && balls[i].x - radius < window_width) {
            balls[cnt++] = balls[i];
        }
    }
    while (balls.length > cnt) {
        balls.pop();
    }
}

function addballs(m, n, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: m + j * 2 * (radius + 1) + (radius + 1),
                    y: n + i * 2 * (radius + 1) + (radius + 1),
                    g: Math.random() * 10 + 2,
                    vx: Math.pow(-1 , Math.ceil(Math.random()*1000)) + 5 ,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                }
                balls.push(aBall);
            }
        }
    }
}

function render(cxt) {

    cxt.clearRect(0, 0, window_width, window_height);

    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    renderdigit(marginLeft, marginTop, parseInt(hours / 10), cxt);
    renderdigit(marginLeft + 15 * (radius + 1), marginTop, parseInt(hours % 10), cxt);
    renderdigit(marginLeft + 30 * (radius + 1), marginTop, 10, cxt);
    renderdigit(marginLeft + 39 * (radius + 1), marginTop, parseInt(minutes / 10), cxt);
    renderdigit(marginLeft + 54 * (radius + 1), marginTop, parseInt(minutes % 10), cxt);
    renderdigit(marginLeft + 69 * (radius + 1), marginTop, 10, cxt);
    renderdigit(marginLeft + 78 * (radius + 1), marginTop, parseInt(seconds / 10), cxt);
    renderdigit(marginLeft + 93 * (radius + 1), marginTop, parseInt(seconds % 10), cxt);

    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, radius, 0, 2 * Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }
}

function renderdigit(m, n, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(m + j * 2 * (radius + 1) + (radius + 1), n + i * 2 * (radius + 1) + (radius + 1), radius, 0, 2 * Math.PI);
                cxt.closePath();

                cxt.fill();
            }
        }
    }
}
