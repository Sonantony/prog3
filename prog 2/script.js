var socket = io();


// let matrix = generate(15,45,8,15,40,20,5)


var side = 15;


function setup() {
    frameRate(5);
    createCanvas(50 * side, 50 * side);
    background('#acacac');
}
function nkarell(matrix) {
    console.log(matrix);
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