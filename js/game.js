var Furry = require("./furry.js");
var Coin = require("./coin.js");

function Game() {
    this.board = document.querySelectorAll("#board > div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function (x, y) {
        return ((y * 10)+x);
    }

    this.showFurry = function () {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }

    this.hideVisibleFurry = function () {
        document.querySelector(".furry").classList.remove("furry");
    }

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    this.hideCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
    }

    var self = this;

    this.startGame = function () {
        this.idSetInterval = setInterval( function () {
            self.hideVisibleFurry();
            self.moveFurry();
            if (!self.lost) {
                self.showFurry();
            }
        }, 250);
        document.addEventListener('keydown', function(event) {
            self.turnFurry(event);
        });
        this.showFurry();
        this.showCoin();
    }

    this.moveFurry = function() {
        if (this.furry.direction === "right") {
            this.furry.x += 1;
        } else if (this.furry.direction === "left") {
            this.furry.x -= 1;
        } else if (this.furry.direction === "up") {
            this.furry.y -= 1;
        } else {
            this.furry.y += 1;
        }
        this.gameOver();

        this.checkCoinCollision();
    }

    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.hideCoin();
            this.score += 1;
            document.querySelector("#score > div > strong").innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }

    this.gameOver = function() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            alert("game over!");
            clearInterval(this.idSetInterval);
            this.lost = true;
        }
    }



    this.turnFurry = function (event) {
        if (event.which  === 37) {
            this.furry.direction = "left";
        } else if (event.which  === 38) {
            this.furry.direction = "up";
        } else if (event.which  === 39) {
            this.furry.direction = "right";
        } else if (event.which  === 40) {
            this.furry.direction = "down";
        }

    }


}



module.exports = Game;
