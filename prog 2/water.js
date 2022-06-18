LivingCreature = require("./LivingCreature")
module.exports =  class Water extends LivingCreature {
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);

    }
    eat() {
        var emptyCells = this.chooseCell(3);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if(newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x] ///kam 3 tiv@
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

        } 
    }

}