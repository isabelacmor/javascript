var MAX_NUM_SAYINGS = 10;
var MIN_NUM_SAYINGS = 4;
var MAX_FONT_SIZE = 40;
var MIN_FONT_SIZE = 12;

var button = document.getElementById('button');

var randomColor = function(opacity) {
    var R = randomNumber(0, 255);
    var G = randomNumber(0, 255);
    var B = randomNumber(0, 255);
	return "rgba(" + R + ", " + G + ", " + B + ", " + opacity + ")";
};

var changeBGColor = function(opacity) {
	var main = document.getElementById('main');
    var color = randomColor(opacity);
    main.style.backgroundColor = color;
};


var listOfAdjs = new Array("so", "very", "such", "much", "wow", "all", "pls", "why", "literally", "actually");
var listOfNouns = new Array("coding", "doge", "intense", "starbs", "pride", "endurance", "skill", "shibe", "scare", "sry", "ninja", "feirce", "trubble", "excite", "happyness", "role modol", "preshus", "die", "romance", "pashun", "DIGnity", "ruff life", "feels", "trick", "...can't even", "love", "do need", "embarass");
var listOfPhrases = new Array("i won't do it", "i refuese", "no pls", "no comment", "infinity rainbows of doge");

var generateSaying = function(){
    var adj = listOfAdjs[randomNumber(0, listOfAdjs.length)];
    var noun = listOfNouns[randomNumber(0, listOfNouns.length)];
    
    return adj + " " + noun;
};

var randomNumber = function(min, max){
    return Math.floor(Math.random() * (max - min) + min);
};

var styleSaying = function(saying){
    //randomly set the color
    var textColor = randomColor(1);
    saying.style.color = textColor;

    //randomly set the size
    saying.style.fontSize = randomNumber(MIN_FONT_SIZE, MAX_FONT_SIZE) + "px";

    //randomly position the saying
    var leftPos = randomNumber(0, window.screen.width - 300);
    var topPos = randomNumber(0, window.screen.height - 300);

    /*while(collides(leftPos, topPos, sayingsContainer.childNodes)){
        leftPos = randomNumber(0, window.screen.width - 100);
        topPos = randomNumber(0, window.screen.height - 100);
    }*/

    saying.style.left = leftPos;
    saying.style.top = topPos;
    
    //randomly set the width
    saying.style.width = randomNumber(30, 100) + "vh";
    
    return saying;
};

var updateSaying = function(numSayings){
    var sayingsContainer = document.getElementById('words');
    var currentSayings = sayingsContainer.childNodes;
    
    while(sayingsContainer.childNodes.length != 0){
        sayingsContainer.removeChild(sayingsContainer.getElementsByTagName('p')[0]);
    }
    
    //generate new ones and add them to the page
    for(var i = 0; i < numSayings; i++){
        //generate the saying
        var newSayingP = document.createElement('p');
        newSayingP.innerHTML = generateSaying();

        //style it
        newSayingP = styleSaying(newSayingP);
        
        //add this saying to the page
        sayingsContainer.appendChild(newSayingP);
    }
    
    //add one full saying
    var newPhrase = document.createElement('p');
    newPhrase.innerHTML = listOfPhrases[randomNumber(0, listOfPhrases.length)];
    
    newPhrase = styleSaying(newPhrase);
    sayingsContainer.appendChild(newPhrase);
};

var doClick = function(){
    changeBGColor(0.9);
    updateSaying(randomNumber(MIN_NUM_SAYINGS, MAX_NUM_SAYINGS));
};

button.onclick = function(){ doClick(); }