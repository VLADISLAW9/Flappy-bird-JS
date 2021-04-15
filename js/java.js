let bird = new Image();
var fon = new Image();
let up_truba = new Image();
let down_truba = new Image();
let stone = new Image();
let fly_audio = new Audio();
let score_audio = new Audio();

bird.src = "img/flappy_bird_bird.png";
fon.src = "bg.png";
up_truba.src = "img/flappy_bird_pipeUp.png";
down_truba.src = "img/flappy_bird_pipeBottom.png"
stone.src = "img/flappy_bird_fg.png";
fly_audio.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

let canvas = document.getElementById("zone");
let s = canvas.getContext("2d");
let bird_x = 10;
let bird_y = 150;
let mass = [];
mass[0] = {
    x: 288,
    y: 0
}

/*mass[1] = {
    x: 200,
    y: 0
}*/
let grav = 1.5;
let score = 0;

document.addEventListener("keydown", up);

function game() {

   
    s.drawImage(fon, 0, 0);
    s.drawImage(stone, 0, fon.height - stone.height);
    s.drawImage(bird, bird_x, bird_y);
    for (let i = 0; i < mass.length; i++) {
        s.drawImage(up_truba, mass[i].x, mass[i].y);
        s.drawImage(down_truba, mass[i].x, mass[i].y + up_truba.height + 150);
        mass[i].x = mass[i].x - 1;
        if (mass[i].x == 120) {
            mass.push({
                x: 288,
                y: Math.floor(Math.random() * up_truba.height) - up_truba.height
            });
        }
        if ((bird_x + bird.width >= mass[i].x) && (bird_x <= mass[i].x + up_truba.width) &&
            (bird_y <= mass[i].y + up_truba.height || bird_y+bird.height>=mass[i].y+up_truba.height+150)) { location.reload();

        }
        if(mass[i].x==0){
          score++;
          score_audio.play();
        }

    }


 
    bird_y = bird_y + grav;
    if(bird_y>(370)){
      location.reload();
      //alert('stop');
    }
    
    s.fillStyle="#000";
    s.fillText("Счет:"+ score,20,20);

    requestAnimationFrame(game);

}

function up() {
    bird_y = bird_y - 25;
    fly_audio.play();
}

stone.onload = game();