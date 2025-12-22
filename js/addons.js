function powerup() {
    var gift_chances = 20
    if (score < 40000) {
        gift_chances = 5
    }

  var chances = {
    spring: 30,
    shoes: 45,
    shield: 80,
    pointup: gift_chances
  };

  if (Math.round(Math.random() * chances["spring"]) === 0) {
    return "spring";
  } else if (Math.round(Math.random() * chances["shoes"]) === 0) {
    return "shoes";
  } else if (Math.round(Math.random() * chances["shield"]) === 0) {
    return "shield";
  } else if (Math.round(Math.random() * chances["pointup"]) === 0) {
    return "pointup";
  }
  return 0;
}

function monster() {
  var chances = {
    small: 60 - (difficulty * 5), // частоты монстров в целом
    big: 55 - (difficulty * 6),
  };

  if (Math.round(Math.random() * chances["small"]) === 0) {
    return "small";
  } else if (Math.round(Math.random() * chances["big"]) === 0) {
    return "big";
  }
  return 0;
}

var small = new (function () {
  this.img = new Image();
  this.img.src = "img/Monsters/small.png";

  this.draw = function (platformX, platformY) {
    context.drawImage(this.img, platformX + 10, platformY - 30, 60, 60);
  };
})();

var big = new (function () {
  this.img = new Image();
  this.img.src = "img/Monsters/big.png";

  this.draw = function (platformX, platformY) {
    context.drawImage(this.img, platformX + 10, platformY - 30, 80, 80);
  };
})();

var monsterFunctions = {
  small: small,
  big: big,
};
