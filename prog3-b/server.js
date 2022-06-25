var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");


matrix = []
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3010);

Grass = require("./grass")
GrassEater = require("./grasseater")
Hunter = require("./hunter")
Lightning = require("./lightning")
Predator = require("./predator")
Water = require("./water")


//   io.on('connection', (socket) => {
//     console.log('a user connected');
//   });

grassArr = [];
grassEaterArr = []
predatorArr = []
waterArr = []
hunterArr = []
lightningArr = []


function generate(matLen, gr, grEat, pr, wt, hun, lt) {
    let matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix.push([])
        for (let j = 0; j < matLen; j++) {
            matrix[i].push(0)
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < wt; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < hun; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    for (let i = 0; i < lt; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
        }
    }
    return matrix
}

matrix = generate(30, 45, 8, 15, 40, 20, 5)
console.log(matrix)
io.sockets.emit("send matrix", matrix);


function createObject(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                let pr = new Predator(x, y)
                predatorArr.push(pr)
            } else if (matrix[y][x] == 4) {
                let wt = new Water(x, y)
                waterArr.push(wt)
            }
            else if (matrix[y][x] == 5) {
                let hun = new Hunter(x, y)
                hunterArr.push(hun)
            }
            else if (matrix[y][x] == 6) {
                let lt = new Lightning(x, y)
                lightningArr.push(lt)
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (var i in waterArr) {
        waterArr[i].eat()
    }
    for (var i in hunterArr) {
        hunterArr[i].eat()
    }
    for (var i in lightningArr) {
        lightningArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix); // todo f
   
}
setInterval(game, 1000)

//io.sockets.emit('send dd', generate(matLen,gr,grEat,pr,wt,hun,lt))

io.on('connection', function (socket) {
    createObject(matrix)
})

/*var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)*/
count = 1
function finish() {
    grassArr = [];
    grassEaterArr = []
    predatorArr = []
    waterArr = []
    hunterArr = []
    lightningArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0
        }
    }
    console.log("finish");

}
io.on("connection", function (socket) {

    socket.on("barev", finish)
}

)
count = 1
function addGrass() {

    for (let i = 0; i <= 5; i++) {
        let x = Math.floor(Math.random() * 5)
        let y = Math.floor(Math.random() * 5)
        if(matrix[y][x] == 0){
            let gr = new Grass(x, y)
            grassArr.push(gr)
    matrix[y][x] = 1
        }
    }
    console.log("yee")
}
io.on("connection", function (socket) {

    socket.on("ev", addGrass)
}

)

count = 1
function addGrassEater() {

    for (let i = 0; i < 2; i++) {
        let x = Math.floor(Math.random() * 2)
        let y = Math.floor(Math.random() * 2)
        if(matrix[y][x] == 0){
            let grEat = new GrassEater(x, y)
            grassEaterArr.push(grEat)
    matrix[y][x] = 2
        }
    }
    console.log("ee")
}
io.on("connection", function (socket) {

    socket.on("vuy", addGrassEater)
}

)
//  count = 1
//  let isNight = false
//io.sockets.emit("uxarkel", isNight);

//  function night(){
//      isNight = true
//      io.sockets.emit('message', {'data': isNight});
//     console.log(isNight)
//  }
//  function light(){
//     console.log()
//     isNight = false
//     io.sockets.emit('message2', {'data': isNight});
//    console.log(isNight)
// }
//  io.on("connection", function (socket) {

//      socket.on("vuyy", night)
//  }
//  )
count = 1
function night(){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("green")
            }
            else if (matrix[y][x] == 1) {
                fill("#green");
            }
            else if (matrix[y][x] == 2) {
                fill("green");
            }
            else if (matrix[y][x] == 3) {
                fill("green");
            }
            else if (matrix[y][x] == 4) {
                fill("green");
            }
            else if (matrix[y][x] == 5) {
                fill("green");
            }
            else if (matrix[y][x] == 6) {
                fill("green");
            }
            rect(x * side, y * side, side, side);


        }
    }
    console.log("eeop")
}
io.on("connection", function (socket) {

    socket.on("vuyuy", night)
}

)
