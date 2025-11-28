var robot = new (function () {
  this.x = 250;
  this.y = 500;
  this.img = new Image();
  this.img.src = "img/robot.png";
  this.width = 80;
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
      r.y + r.height < p.y + p.height  &&
      r.y + r.height > p.y
    );
  };

  this.touchMonster = function (r, m) {
    return (
      parseInt(r.x) + parseInt(r.width) - 13 > parseInt(m.x) &&
      parseInt(r.x) + 13 < parseInt(m.x) + parseInt(m.width) &&
      parseInt(r.y) + parseInt(r.height) > parseInt(m.y) &&
      parseInt(r.y) + 25 < parseInt(m.y) + parseInt(m.height)
    );
  };

  this.jump = function (powerup, type) {
    this.velocityForY = -13.4;

    if (powerup === "shoes" && this.boots == 0) {
      this.bootsJumpCount += 5;
      this.boots = 1;
    }

    if (type != "break") {
      if (powerup === "spring") {
        this.velocityForY = -20;
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
