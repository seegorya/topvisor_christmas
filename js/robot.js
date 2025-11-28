var robot = new (function () {
  this.x = 250;
  this.y = 500;
  this.img = new Image();
  this.img.src = "img/robot.png";
  this.width = 80; // мне размер больше не нравится но тоже попробовать
  this.height = 80;
  this.velocityForX = 7;
  this.velocityForY = 0;
  this.bootsJumpCount = 0;
  this.shieldJumpCount = 0;
  this.shield = 0;
  this.boots = 0;
  this.imgaddon = new Image();

  this.onPlatform = function (r, p) {
    return (
      r.x < p.x + p.width - 20 &&
      r.x + r.width > p.x + 20 &&
      r.y < p.y + p.height - r.height &&
      r.y > p.y - r.height
    );
  };

  this.touchMonster = function (r, m) {
    return (
      r.x + r.width > m.x + 10 &&
      r.x < m.x + m.width - 10 &&
      r.y < m.y + m.height &&
      r.y > m.y - m.height
    );
  };

  this.jump = function (powerup, type) {
    this.velocityForY = -17.4;

    if (powerup === "shoes" && this.boots == 0) {
      this.bootsJumpCount += 5;
      this.boots = 1;
      //presents+=1;
    }

    if (type != "break") {
      if (powerup === "spring") {
        this.velocityForY = -20;
        //presents+=1;
      }
    }

    if (this.bootsJumpCount > 0) {
      this.velocityForY = -20;
      this.bootsJumpCount -= 1;
    } else {
      this.boots = 0;
    }

    if (powerup === "shield" && this.shield == 0) {
      this.shieldJumpCount += Math.floor(Math.random() * 7) + 6;
      this.shield = 1;
      //presents+=1;
    }

    if (this.shieldJumpCount > 0) {
      this.shieldJumpCount -= 1;
    } else {
      this.shield = 0;
    }
  };

  this.draw = function () {
    context.drawImage(this.img, this.x, this.y, this.width, this.height);

    if (this.bootsJumpCount > 0) {
      this.imgaddon.src = "img/Addons/shoes.png";
      context.drawImage(this.imgaddon, this.x + 55, this.y + 38, 40, 40);
    }

    if (this.shieldJumpCount > 0) {
      this.imgaddon.src = "img/Addons/shield.png";
      context.drawImage(this.imgaddon, this.x+20, this.y - 10, 40, 30);
    }
  };
})();
