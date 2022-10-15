var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var start = false;

$("body").keydown(function(){
    if (start===false){
        nextSequence();
    }
});


function restart(){
    gamePattern = [];
    userClickedPattern = [];
    start = false;
}

function checkAnswer(){
    var currentLevel = userClickedPattern.length;
    console.log(currentLevel);
    console.log(gamePattern.length);
    if (userClickedPattern.length==gamePattern.length){
        console.log("check answer");
        console.log(userClickedPattern, gamePattern);
        if (JSON.stringify(userClickedPattern)===JSON.stringify(gamePattern)){
            console.log("success");
            userClickedPattern=[];
            var currentLevel = gamePattern.length;
            playSound("positive");
            setTimeout(function(){
                $("#level-title").text("Level "+currentLevel);
            },500);
            setTimeout(function(){
                nextSequence()},1200);
        }
        else {
            console.log("wrong");
            var audioElement = new Audio("sounds/wrong.mp3");
            audioElement.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over")}, 100);
            $("h1").text("Game Over, Press Any Key to Restart");
            restart();
        }

    }
console.log("go on with click patterns");
}

function animatePress(currentColour){
    var id = "#"+currentColour;
    $(id).addClass("pressed");
    setTimeout(function(){
        $(id).removeClass("pressed")}, 100);
}

function playSound(name){
    var audioElement = new Audio("sounds/"+name+".mp3");
    audioElement.play();
}

function nextSequence(){
    start = true;
    var currentLevel = gamePattern.length;
    $("#level-title").text("Level "+currentLevel);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    id = "#"+buttonColours[randomNumber];
    $(id).fadeOut(100).fadeIn(100);
    playSound(buttonColours[randomNumber]);
    animatePress(randomChosenColour);
    console.log(gamePattern);
};

$(".btn").click(function(){
    userClickedPattern.push(this.id);
    console.log(userClickedPattern);
    playSound(this.id);
    checkAnswer();
});