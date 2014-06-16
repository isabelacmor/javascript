var MAX_NUM_SAYINGS = 20;
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


var listOfAdjs = new Array("so", "very", "such", "much", "wow", "all");
var listOfNouns = new Array("coding", "doge", "intense", "starbs");

var generateSaying = function(){
    var adj = listOfAdjs[randomNumber(0, listOfAdjs.length)];
    var noun = listOfNouns[randomNumber(0, listOfNouns.length)];
    
    return adj + " " + noun;
};

var randomNumber = function(min, max){
    return Math.floor(Math.random() * (max - min) + min);
};

var collides = function(left, top, listOfSayings){
    for(var i = 0; i < listOfSayings.length; i++){
        rect1 = listOfSayings[i];
        
        if(!(rect1.right < left || rect1.left > left+100 || rect1.bottom < top || rect1.top > top+100)) 
            return true;
    }
    
    return false;
};

var updateSaying = function(numSayings){
    var sayingsContainer = document.getElementById('words');
    var currentSayings = sayingsContainer.childNodes;
    
    //remove the current sayings
    for(var i = 0; i < currentSayings.length; i++){
        sayingsContainer.removeChild(currentSayings[i]);
    }
    
    console.log("removed all children");
        
    //generate new ones and add them to the page
    for(var i = 0; i < numSayings; i++){
        //generate the saying
        var newSayingP = document.createElement('p');
        newSayingP.innerHTML = generateSaying();
        
        //randomly set the color
        var textColor = randomColor(1);
        newSayingP.style.color = textColor;
        
        //randomly set the size
        newSayingP.style.fontSize = randomNumber(MIN_FONT_SIZE, MAX_FONT_SIZE) + "px";
        
        //randomly position the saying
        var leftPos = randomNumber(0, window.screen.width - 100);
        var topPos = randomNumber(0, window.screen.height - 100);
        
        /*
        while(collides(leftPos, topPos, sayingsContainer.childNodes)){
            leftPos = randomNumber(0, window.screen.width - 100);
            topPos = randomNumber(0, window.screen.height - 100);
        }*/
        
        newSayingP.style.left = leftPos;
        newSayingP.style.top = topPos;
        
        //add this saying to the page
        sayingsContainer.appendChild(newSayingP);
    }
};

var doClick = function(){
    changeBGColor(0.9);
    updateSaying(randomNumber(MIN_NUM_SAYINGS, MAX_NUM_SAYINGS));
};

button.onclick = function(){ doClick(); }