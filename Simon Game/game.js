var gamePattern = [];
var userPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStarted = false;

function nextSequence(){
    level ++;
    var rndNumber = Math.floor(Math.random() * 4);
    var randonChosenColor = buttonColors[rndNumber];
    gamePattern.push(randonChosenColor);
    console.log("game-pattern - "+gamePattern);
    $("#"+randonChosenColor).fadeOut(100).fadeIn(100);
    playSound(randonChosenColor);
    $("#level-title").text("Level "+level);
}

function playSound(sound){
    var audio = new Audio('./sounds/'+ sound +'.mp3');
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

var clickCount = 0;
$(".btn").on("click", function () {
    var match = false;
    var userChosenColor = this.id;
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log("user-Pattern - " + userPattern)
    if(clickCount < gamePattern.length){
        if(userPattern[clickCount] == gamePattern[clickCount]){
            clickCount++;
            match = true;
            console.log(clickCount)
        } else {
            playSound('wrong');
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            },200);
            match = false;
            gameStarted = false;
            
        }
    } 
    if(clickCount >= gamePattern.length) {
        clickCount = 0;
        userPattern = [];
        setTimeout(function () {
            nextSequence();
        },1000);
    }

});

$(document).on("keypress", function (e) {
    if(!gameStarted){
        gameStarted = false;
        level = 0;
        userPattern = [];
        gamePattern = [];
        clickCount = 0;
        gameStarted = true;
        console.log(e.key);
        nextSequence();
    }
});