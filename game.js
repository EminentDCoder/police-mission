var suspects = document.getElementsByClassName("suspect");
var suspectCars = document.getElementById("suspect-cars").value;

//HIDING THE SUSPECT'S CARS
for (var i = 0; i<suspects.length; i++){
    suspects[i].style.display = "none";
}
var index;
//FUNCTION TO CHOOSE A CAR
function chooseCar(){
    if( suspectCars == "car1"){
        suspects[0].style.display = "initial";
        index = 0;
    }
    else if( suspectCars == "car2"){ 
        suspects[1].style.display = "initial";
        index = 1;
    }
    else if( suspectCars == "car3"){ 
        suspects[2].style.display = "initial";
        index = 2;
    }
    else if( suspectCars == "car4"){ 
        suspects[3].style.display = "initial";
        index = 3;
    }
    else if( suspectCars == "car5"){ 
        suspects[4].style.display = "initial";
        index = 4;
    }
}
setInterval(chooseCar, 1);


//MOVING THE THEIF CAR LEFT AND RIGHT
var suspectMove = 0;
function leftMove(){
    suspectMove = parseInt(window.getComputedStyle(suspects[index]).getPropertyValue("left"));
    suspectMove -=100;
    if(suspectMove >= 0){
        suspects[index].style.left = suspectMove + "px";
    }
}

function rightMove(){
    suspectMove = parseInt(window.getComputedStyle(suspects[index]).getPropertyValue("left"));
    suspectMove +=100;
    if(suspectMove <=200){
        suspects[index].style.left = suspectMove + "px";
    }
}

//POLICE MOVE ON HORIZONTAL AXIS & VERTICAL AXIS
var police = document.getElementById("police");
var policeCar  = 0;
function policeMove(){
    var random = Math.floor(Math.random() * 3);
    policeCar = random * 100;
    police.style.left = policeCar + "px";
}
police.onanimationiteration = policeMove;


var markInterval;
//START GAME FUNCTION
function startFunc(){   
    // window.location.reload();
    landingPage.style.display ="none";
    playGround.style.display ="grid";
    markInterval = setInterval(markFunc, 1000);
}

var statusBar = document.getElementById("status-bar");
statusBar.style.display = "none";
//GAME OVER FUNCTION
function over(){
    var policeTop = parseInt(window.getComputedStyle(police).getPropertyValue("top"));
    if(policeCar == suspectMove && policeTop < 500 && policeTop > 300){
       police.style.position = "initial";
       police.style.animation = "none";
       clearInterval(markInterval);   
       statusBar.style.display = "initial";
       var status = document.getElementById("status");
       if(mark >= highScore){ 
            status.innerHTML = "Game Over" + "<br>" + " Wao! Your New High Score is: " + mark ;
       }
       else{
            status.innerHTML ="Game Over" + "<br>" + "Try Again Your Score is: " + mark ;
       }
    }
}
setInterval(over, );

//MARK AWARDING FUNCTION
var mark = 0;
score.innerHTML = "Scores: " + mark;
function markFunc(){    
    mark+=1;
    var score = document.getElementById("score");
    score.innerHTML = "Scores: " + mark;
    //CHECHKING FOR HIGHSCORES
    if(mark > highScore) {
        highScore = mark;
        localStorage.setItem("myHighScore", highScore);
    }
}

// var markInterval = setInterval(markFunc, 1000);
   
    
// TOUCHPAD CONTROLS
var leftTouch = document.getElementById("leftTouch");
leftTouch.ontouchstart = leftMove;

var rightTouch = document.getElementById("rightTouch");
rightTouch.ontouchstart = rightMove;


//STORE HIGH SCORES
var highScore = localStorage.getItem("myHighScore") || 0;
document.getElementById("high-score").innerHTML = "High Score " + highScore;

//START GAME
var startGame = document.getElementById("start-game");
startGame.onclick = startFunc;


var landingPage = document.getElementById("landing-page");
var playGround = document.getElementById("play-ground");
playGround.style.display ="none";

//TRY AGAIN AND END FUNCTION
function reLoad(){   
    window.location.reload();
}
var end = document.getElementById("end");
end.onclick = reLoad;

//RESET HIGH SCORES
function resetFunc(){
    localStorage.clear();
    location.reload();
}
var reset = document.getElementById("reset");
reset.onclick = resetFunc;