window.addEventListener("keydown", move, false);
window.addEventListener("keyup", stopmove, false);
character = document.getElementById("character");
turret = document.getElementById("turret");
bullet = document.getElementById("bullet");
zombie = document.getElementById("zombie");
moveoffset = window.innerWidth/192;
reload = 0;
score = 0;
function followturret(event) {
  var centerX = turret.offsetLeft;
  var centerY = turret.offsetTop + turret.offsetHeight/2;
  var dx = event.pageX - centerX;
  var dy = event.pageY - centerY;
  angle = Math.atan2(dy, dx) * 180/Math.PI;
  turret.style.transform = 'rotate('+angle+'deg)';
}

function move(event) {
  if (event.keyCode == "87" && character.offsetTop > 0) {
    $("#character").animate({
      top: "-=100vw"
    }, 3000);
    $("#turret").animate({
      top: "-=100vw"
    }, 3000);
  } else if (event.keyCode == "65" && character.offsetLeft > 0) {
    $("#character").animate({
      left: "-=100vw"
    }, 3000);
    $("#turret").animate({
      left: "-=100vw"
    }, 3000);
  } else if (event.keyCode == "83" && character.offsetTop < window.innerHeight - character.offsetHeight) {
    $("#character").animate({
      top: "+=100vw"
    }, 3000);
    $("#turret").animate({
      top: "+=100vw"
    }, 3000);
  } else if (event.keyCode == "68" && character.offsetLeft < window.innerWidth - character.offsetWidth) {
    $("#character").animate({
      left: "+=100vw"
    }, 3000);
    $("#turret").animate({
      left: "+=100vw"
    }, 3000);
  } else if (event.keyCode == "13" && character.style.display == "none") {
    character.style.display = "block";
    character.style.top = "45vh";
    character.style.left = "calc(50vw - 5vh)";
    turret.style.display = "block";
    turret.style.top = "49vh";
    turret.style.left = "50vw";
    document.getElementById("dead").style.display = "none";
    document.getElementById("shader").style.display = "none";
    document.getElementById("continue").style.display = "none";
    score = 0;
    document.getElementById("score").innerHTML = score;
  }
}

function shoot() {
  if (reload == 0 && character.style.display != "none") {
    bullet.style.display = "block";
    bullet.style.left = character.offsetLeft + character.offsetWidth/2 - bullet.offsetWidth/2 + Math.cos(angle*Math.PI/180)*turret.offsetWidth + 'px';
    bullet.style.top = character.offsetTop + character.offsetHeight/2 - bullet.offsetHeight/2 + Math.sin(angle*Math.PI/180)*turret.offsetWidth + 'px';
    $("#bullet").stop(true);
    var x = Math.cos(angle*Math.PI/180) * (window.innerWidth + window.innerHeight);
    var y = Math.sin(angle*Math.PI/180) * (window.innerWidth + window.innerHeight);
    $("#bullet").animate({left: '+='+x+'px', top: '+='+y+'px'}, 800);
    reload = 1;
    setTimeout(function() {
      reload = 0;
    }, 1000)
  } else {
    return;
  }
}

function stopmove(event) {
  if (event.keyCode == "87" || event.keyCode == "65" || event.keyCode == "83" || event.keyCode == "68") {
    $("#character").stop(true);
    $("#turret").stop(true);
  }
}

setInterval(function() {
  if ((bullet.offsetLeft < zombie.offsetLeft + zombie.offsetWidth && bullet.offsetLeft > zombie.offsetLeft) && (bullet.offsetTop < zombie.offsetTop + zombie.offsetHeight && bullet.offsetTop > zombie.offsetTop) && bullet.style.display == "block") {
    bullet.style.display = "none";
    zombie.style.display = "none";
    score += 1;
    document.getElementById("score").innerHTML = score;
  }
  if (character.offsetLeft < zombie.offsetLeft + zombie.offsetWidth && character.offsetLeft > zombie.offsetLeft - character.offsetWidth && 
  character.offsetTop < zombie.offsetTop + zombie.offsetHeight && 
  character.offsetTop > zombie.offsetTop - character.offsetHeight) {
    character.style.display = "none";
    turret.style.display = "none";
    document.getElementById("dead").style.display = "block";
    document.getElementById("shader").style.display = "block";
    document.getElementById("continue").style.display = "block";
  }
  if (character.offsetLeft < 0) {
    $("#character").stop(true);
    $("#turret").stop(true);
    character.style.left = "0px";
    turret.style.left = character.offsetLeft + character.offsetWidth/2 + 'px';
  } else if (character.offsetTop > window.innerHeight - character.offsetHeight) {
    $("#character").stop(true);
    $("#turret").stop(true);
    character.style.top = window.innerHeight - character.offsetHeight + 'px';
    turret.style.top = window.innerHeight - character.offsetHeight/2 - turret.offsetHeight/2 + 'px';
  } else if (character.offsetLeft > window.innerWidth - character.offsetWidth) {
    $("#character").stop(true);
    $("#turret").stop(true);
    character.style.left = window.innerWidth - character.offsetWidth + 'px';
    turret.style.left = window.innerWidth - character.offsetWidth/2 + 'px';
  } else if (character.offsetTop < 0) {
    $("#character").stop(true);
    $("#turret").stop(true);
    character.style.top = "0px";
    turret.style.top = character.offsetHeight/2 - turret.offsetHeight/2 + 'px';
  }
}, 10);

setInterval(function() {
  zombieXY = $("#zombie").position();
  characterXY = $("#character").position();
  var diffX = zombieXY.left - characterXY.left;
  var diffY = zombieXY.top - characterXY.top;
  var newX = zombieXY.left - diffX/100;
  var newY = zombieXY.top - diffY/100;
  $("#zombie").css({left: newX, top: newY});
}, 10);

setInterval(function() {
  if (zombie.style.display == "none") {
    zombie.style.display = "block";
    var maxposX = window.innerWidth - zombie.offsetWidth;
    var randposX = Math.floor(Math.random() * maxposX);
    var maxposY = window.innerHeight - zombie.offsetHeight;
    var randposY = Math.floor(Math.random() * maxposY)
    zombie.style.left = randposX + 'px';
    zombie.style.top = randposY + 'px';
  }
}, 10)
