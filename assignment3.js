"use-strict";

// Create the canvas
let gameDiv = document.getElementById("game");

let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
let ctx2 = canvas.getContext("2d");
canvas.width = 656;
canvas.height = 344;

gameDiv.appendChild(canvas);

// Gem Image
let gemReady = false;
let gemImage = new Image();
gemImage.onload = function() {
    gemReady = true;
};
gemImage.src = "purple_gem.png";

// Background Image
let backgroundReady = false;
let backgroundImage = new Image();
backgroundImage.onload = function() {
    backgroundReady = true;
};
backgroundImage.src = "cave.jpg";

// Pickaxe Image
canvas.addEventListener("mousemove", function() {
    canvas.style.cursor = "url('pickaxe.png'), auto";
});

// Set scale factor
let scaleFactor = 2;

// Set interval milliseconds
let milliseconds = 3000;
let intervalId;

// Game Objects
let gem = {
    x: 0,
    y: 0
}
let gemsCaught = 0;
let speed = 1.0;

// Reset game when gem is clicked
function reset() {
    // Throw the gem somewhere on the screen
    gem.x = 32 + Math.floor(Math.random() * (canvas.width - 64));
    gem.y = 32 + Math.floor(Math.random() * (canvas.height - 64));
};

// Draw Gem
function render() {
    if (backgroundReady) {
        // Draw background on the canvas
        backgroundImage.style.filter = "brightness(50%)";
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
    if (gemReady) {
        // Draw the gem on the canvas
        ctx.drawImage(gemImage, gem.x, gem.y, gemImage.width * scaleFactor, gemImage.height * scaleFactor);
    };
    
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Gems Caught: " + gemsCaught, 32, 10); 

    // Speed
    ctx2.fillStyle = "rgb(250, 250, 250)";
    ctx2.font = "24px Helvetica";
    ctx2.textAlign = "left";
    ctx2.textBaseline = "top";
    ctx2.fillText("Speed: " + speed.toFixed(1) + "x", 500, 10); 
};

// The main game loop
let main = function () {
    render();
    canvas.onclick = function(event) {
        // Check if the click was on the gem
        if (event.offsetX >= gem.x && event.offsetX <= gem.x + gemImage.width * scaleFactor &&
            event.offsetY >= gem.y && event.offsetY <= gem.y + gemImage.height * scaleFactor) {
            gemsCaught++;
            speed += 0.1;
            clearInterval(intervalId);

            // Set interval to reset gem image 
            milliseconds = milliseconds - 100;
            intervalId = setInterval(function() {
                reset();
              }, milliseconds);

            reset();
        }
    };
    // Request to do this again 
    requestAnimationFrame(main);
};

// Reset speed
ResSpeed = document.getElementById("ResSpeed");
ResSpeed.onclick = function() {
    milliseconds = 3000;
    clearInterval(intervalId);
    intervalId = setInterval(function() {
        reset();
    }, milliseconds);
    speed = 1.0;
};

// Reset score
ResScore = document.getElementById("ResScore");
ResScore.onclick = function() {
    gemsCaught = 0;
};

// Cross-browser support for requestAnimationFrame
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Start the game
reset();
main();
