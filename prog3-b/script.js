var socket = io();


// let matrix = generate(15,45,8,15,40,20,5)


var side = 10;


function setup() {
    frameRate(5);
    createCanvas(30 * side, 30 * side);
    background('#acacac');
}
function nkarell(matrix) {
    // console.log(matrix);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("white");
            }
            else if (matrix[y][x] == 6) {
                fill("black");
            }
            rect(x * side, y * side, side, side);


        }
    }

}

    setInterval(
        function () {
        socket.on('send matrix', nkarell)
        },1000
    )

    var socket = io()

    btn = document.getElementById("")
   function hey(){
        socket.emit("barev")
   }
   var socket = io()

    btn = document.getElementById("")
   function hi(){
        socket.emit("ev")
   }
   var socket = io()

   btn = document.getElementById("")
  function hello(){
       socket.emit("vuy")
  }