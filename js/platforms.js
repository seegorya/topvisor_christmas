class platform {
  constructor() {
    this.x;
    this.y;
    this.width = 95; // 100 или 90
    this.height = 27; // показать с 25 и с 30, мне 25 больше нравится
    this.powerup;
    this.type;
    this.img = new Image();
    this.monster;
    this.direction = "right";
    this.moveTime = 9;
    this.speed;
    this.imgaddon = new Image();

    this.draw = function () {
      if (this.type === "break") {
        this.img.src = "img/platform1.png";
      } else if (this.type === "normal") {
        this.img.src = "img/platform.png";
      } else {
        this.img.src = "img/platform2.png";
      }

      if (this.monster === 0) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
      } else {
        monsterFunctions[this.monster].draw(this.x, this.y);
      }

      if (this.powerup === "spring") {
        this.imgaddon.src = "img/Addons/spring.png";
        context.drawImage(this.imgaddon, this.x + 30, this.y - 35, 40, 35);
      } else if (this.powerup === "shoes") {
        this.imgaddon.src = "img/Addons/shoes.png";
        context.drawImage(this.imgaddon, this.x + 30, this.y - 40, 40, 40);
      } else if (this.powerup === "shield") {
        this.imgaddon.src = "img/Addons/shield.png";
        context.drawImage(this.imgaddon, this.x + 30, this.y - 30, 40, 30);
      } else if (this.powerup === "pointup") {
        this.imgaddon.src = "img/Addons/pointup.png";
        context.drawImage(this.imgaddon, this.x + 30, this.y - 41, 40, 40);
      }
    };

    this.update = function () {
      if (this.type === "sideways") {
        if (this.x >= screenWidth - this.width) {
          this.direction = "left";
        } else if (this.x <= 0) {
          this.direction = "right";
        }

        if (this.direction === "right") {
          this.x += this.speed;
        } else {
          this.x -= this.speed;
        }
      }

      if (this.monster != 0) {
        if (this.direction === "right") {
          this.x += 1;
          this.moveTime -= 1;

          if (this.moveTime === 0) {
            this.direction = "left";
            this.moveTime = 9; // причина тряски
          }
        } else {
          this.x -= 1;
          this.moveTime -= 1;

          if (this.moveTime === 0) {
            this.direction = "right";
            this.moveTime = 9;
          }
        }
      }
    };

    this.spawnplatform = function () {
      var platformChances = {
        break: 15,
        sideways: Math.round(10 / difficulty)
      };

      if (Math.round(Math.random() * platformChances["break"]) === 0) {
        return "break";
      } else if (
        Math.round(Math.random() * platformChances["sideways"]) === 0
      ) {
        return "sideways";
      } else {
        return "normal";
      }
      return 0;
    };

    this.platformsSet = function () {
      if (lowest === 0) {
        var i = 1;
      } else {
        var i = lowest;
      }

      for (i; i < lowest + 100; i++) {
        if (i >= platforms.length) {
          platforms.push(new platform());
          platforms[i].type = this.spawnplatform();
          platforms[i].powerup = 0;
          platforms[i].monster = 0;
          platforms[i].speed = Math.random() * 2 + 1;

          if (platforms[i].type != "break") {
            platforms[i].powerup = powerup();

            if (platforms[i].powerup === 0 && score > 1300) { // генерация монстров на начале да нет
              platforms[i].monster = monster();
            }
          }

          platforms[i].x = Math.random() * (screenWidth - platforms[i].width);
          if (
            platforms[i].type === "break" ||
            platforms[i - 1].type === "break"
          ) {
            platforms[i].y =
              platforms[i - 1].y -
              (Math.random() * (70 + difficulty * 25) + 20) / 2;
          } else {
            platforms[i].y =
              platforms[i - 1].y -
              (Math.random() * (70 + difficulty * 25) + 20);
          }
        }
      }
      for (var i = 0; i < lowest - 2; i++) {
        platforms.shift();
      }
    };
  }
}
