class SnakeGame {
  constructor() {
    this.snakeArray = []; /*初始化蛇关节的数组*/
    this.isPause = false; /*游戏是否暂停：未暂停*/
    this.snakeSize = 5; /*蛇的初始长度*/
    this.direct = "right"; /*蛇初始方向：向右*/
    this.speed = 80; /*蛇移动初始速度：80*/
    this.score = null;
    this.timer = null;
    this.board = null;
    this.bean = null;
    this.x = null;
    this.y = null;
  }

  init() {
    window.onload = () => {
      this.board = document.querySelector("#board");
      this.score = document.querySelector("#score");
      this.createSnake();
      this.createBean();
      this.keyListener();
    };
  }

  createSnake() {
    for (let i = 0; i < this.snakeSize; i++) {
      let snake = document.createElement("div");
      if (i === 0) snake.style.backgroundColor = "red";
      this.snakeArray.push(snake);
      snake.style.left = (this.snakeSize - i - 1) * 20 + "px";
      this.board.appendChild(snake);
    }
  }

  randomXY() {
    this.x = parseInt("" + Math.random() * (1000 / 20)) * 20;
    this.y = parseInt("" + Math.random() * (500 / 20)) * 20;

    for (let i = 0; i < this.snakeArray.length; i++) {
      if (this.snakeArray[i].offsetLeft === this.x) {
        if (this.snakeArray[i].offsetTop === this.y) {
          this.randomXY();
          break;
        }
      }
    }
  }
  createBean() {
    if (this.bean) this.board.removeChild(this.bean);
    this.bean = document.createElement("span");
    this.randomXY();

    this.bean.style.left = this.x + "px";
    this.bean.style.top = this.y + "px";
    this.board.appendChild(this.bean);
  }

  keyListener() {
    document.onkeydown = (event) => {
      let oEvent = event || window.event;
      switch (oEvent.code) {
        case 'ArrowLeft':
          if (this.direct !== "right") this.direct = "left";
          break;
        case 'ArrowUp':
          if (this.direct !== "down") this.direct = "up";
          break;
        case 'ArrowRight':
          if (this.direct !== "left") this.direct = "right";
          break;
        case 'ArrowDown':
          if (this.direct !== "up") this.direct = "down";
          break;
        case 'Space':
          if (!this.isPause) this.pause();
          else this.start();
          this.isPause = !this.isPause;
          break;
      }
    };
  }

  start() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.move();
      this.isHit();
      this.isEat();
    }, this.speed);
  }

  move() {
    let hLeft = this.snakeArray[0].offsetLeft;
    let hTop = this.snakeArray[0].offsetTop;

    switch (this.direct) {
      case "left":
        if (hLeft <= 0) {
          this.gameover();
          return;
        }
        this.snakeBodyMove();
        this.snakeArray[0].style.left = hLeft - 20 + "px";
        break;
      case "up":
        if (hTop <= 0) {
          this.gameover();
          return;
        }
        this.snakeBodyMove();
        this.snakeArray[0].style.top = hTop - 20 + "px";
        break;
      case "right":
        if (hLeft >= 1000 - 20) {
          this.gameover();
          return;
        }
        this.snakeBodyMove();
        this.snakeArray[0].style.left = hLeft + 20 + "px";
        break;
      case "down":
        if (hTop >= 500 - 20) {
          this.gameover();
          return;
        }
        this.snakeBodyMove();
        this.snakeArray[0].style.top = hTop + 20 + "px";
        break;
    }
  }

  snakeBodyMove() {
    for (let i = this.snakeArray.length - 1; i > 0; i--) {
      this.snakeArray[i].style.left = this.snakeArray[i - 1].style.left;
      this.snakeArray[i].style.top = this.snakeArray[i - 1].style.top;
    }
  }

  isHit() {
    for (let i = 1, j = this.snakeArray.length; i < j; i++) {
      if (
        this.snakeArray[0].offsetLeft === this.snakeArray[i].offsetLeft &&
        this.snakeArray[0].offsetTop === this.snakeArray[i].offsetTop
      ) {
        this.gameover();
        break;
      }
    }
  }

  isEat() {
    if (
      this.snakeArray[0].offsetLeft === this.bean.offsetLeft &&
      this.snakeArray[0].offsetTop === this.bean.offsetTop
    ) {
      this.score.innerText = parseInt(this.score.innerText) + 1;
      let snake = document.createElement("div");
      snake.style.left = this.bean.style.left;
      snake.style.top = this.bean.style.top;
      this.snakeArray.push(snake);
      this.board.appendChild(snake);
      this.createBean();
    }
  }

  gameover() {
    clearInterval(this.timer);
    location.reload();
    alert("game over!");
  }

  pause() {
    clearInterval(this.timer);
  }

  reset() {
    location.reload();
  }
}
const snakeGame = new SnakeGame();
snakeGame.init();
