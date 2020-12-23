/*
 * Auto-generated content from the Brackets New Project extension.  Enjoy!
 */

/* Gonna need to break down all of this and put it in the right order at some point. ugh... */

var strWord = "PASSWORD";
var strGuess = getMyEmptyWord(strWord);
document.getElementById("guessWord").innerHTML = strGuess;
var intFailedAttempts = 6;
var currBtnValue = 64;
// Change every 3 seconds
setInterval(changeButton, 1000);

// This is what will change the focus of the currently selected button
// We need to make a function to convert a number (such as 65) to its corresponding letter (A in this example)
//   This function will help changeButton() and letterPressed()
// Also after that I will need to make the selected button change colors and obvisouly then we will need to remove
//       the labels at the bottom of the page that shows the number of attempts and the current selected button and
//       after all that we go and make it look nice and pretty because it should work then
// Currently putting all my notes here so after we do all that work we will also clean up this code in the JavaScript.
// We also need to note all the work that we can do to improve this site and then personally if there is anything that would help
//     with the code in general for like other games if possible. Being able to import and export code from the js that will just
//     deal with a constantly changing focused button and things like that would be very helpful but this site is just being shoved
//     together to teach me web development and to force me ahead so this whole thing will most likely need to be refactored all over
//     the place at some point, or it will have to be remade entirely. Either option is fine with me, but yeah. Current goal is to
//     finish this and then possible make other games really quickly and then we can focus on making it look nice, while I focus on
//     getting it on the web and then slowly moving on to the MEAN stack, such as Angular and then another part so I can slowly learn
//     how to actually be a Full Stack Developer.
function changeButton() {
    ++currBtnValue;
    
    // Change the presentation of our current button
    document.getElementById("btn" + getCode(currBtnValue)).style.background = "#FF0000";
    if (currBtnValue === 65){
        // Set Z to grey
        document.getElementById("btn" + getCode(90)).style.background = "#e7e7e7";
    } else {
        document.getElementById("btn" + getCode(currBtnValue - 1)).style.background = "#e7e7e7";
    }
    
    // Set currBtnValue to before A's value if it is Z's value
    if (currBtnValue === 90){
        currBtnValue = 64;
    }
}

// Return the code that correlates to the number from the KeyCode table
function getCode(myCode) {
    switch(myCode){
        case 65:
            myCode = "KeyA";
            break;
        case 66:
            myCode = "KeyB";
            break;
        case 67:
            myCode = "KeyC";
            break;
        case 68:
            myCode = "KeyD";
            break;
        case 69:
            myCode = "KeyE";
            break;
        case 70:
            myCode = "KeyF";
            break;
        case 71:
            myCode = "KeyG";
            break;
        case 72:
            myCode = "KeyH";
            break;
        case 73:
            myCode = "KeyI";
            break;
        case 74:
            myCode = "KeyJ";
            break;
        case 75:
            myCode = "KeyK";
            break;
        case 76:
            myCode = "KeyL";
            break;
        case 77:
            myCode = "KeyM";
            break;
        case 78:
            myCode = "KeyN";
            break;
        case 79:
            myCode = "KeyO";
            break;
        case 80:
            myCode = "KeyP";
            break;
        case 81:
            myCode = "KeyQ";
            break;
        case 82:
            myCode = "KeyR";
            break;
        case 83:
            myCode = "KeyS";
            break;
        case 84:
            myCode = "KeyT";
            break;
        case 85:
            myCode = "KeyU";
            break;
        case 86:
            myCode = "KeyV";
            break;
        case 87:
            myCode = "KeyW";
            break;
        case 88:
            myCode = "KeyX";
            break;
        case 89:
            myCode = "KeyY";
            break;
        case 90:
            myCode = "KeyZ";
            break;
    }
    
    // Send back the Code value or the original value
    return myCode;
}


// Testing button presses on page
//  NOTE: Letters A-Z go from 65-90 for the key codes
function letterPressed(event) {
    // Use the letter pressed for finding the button
    var myBtn = "btn" + event.code;
    
    // Make the function call if the space bar is clicked
    if (event.keyCode === 32) {
        var currBtn = "btn" + getCode(currBtnValue);
        document.getElementById(currBtn).click();
    }
    
    document.getElementById(myBtn).click();
}

// Get our elements here I guess.
document.getElementById("FullWord").innerHTML = strWord;
document.getElementById("guessWord").innerHTML = strGuess;


// This a function that I should full state what it does and what not.
// HEY I NEED TO START CREATING COMMENTING COMMON PRACTICES
// --- This creates the underscores for our hangman word/phrase
function getMyEmptyWord(strWord)
{    
    var strEmpty = "";
    
    // First we find the length of our word
    var intLoop = strWord.length;
    
    // Now we loop to replace all letters with the underscore '_'
    var i;
    for (i = 0; i < intLoop; i++)
        {
            strEmpty += "_";
            // This is just to count how the things should would, will have to add spaces later by the way 
            //strEmpty += i;
        }
    
    return strEmpty;
}


// This function is designed to test the letter that we have pressed
// If the letter is in the word then we show it;
//      if not, then we raise the failedAttempts score
function testLetter(cLetter)
{
    var places = "#";
    var bFound = false;
    
    //alert(places);
    //alert(document.getElementById("btnZ").textContent);
    
    for (var i = 0; i < strWord.length; i++) {
        if (strWord.charAt(i) == cLetter) {
            places += i + " ";
            //alert("k");
            bFound = true;
            insertLetter(i, cLetter);
        }
    }
    
    //alert(places);
    
    // If the letter is no where to be found then update the misses
    if (!bFound) {
        --intFailedAttempts;
        var imgSrc = "images/Flower_" + intFailedAttempts + "-6.png";
        document.getElementById("tryImage").src = imgSrc;
        if (0 === intFailedAttempts) {
            alert("OH NO YOU HAVE USED ALL YOUR TRIES. Sorry.");
            // Use this for now to disable all the buttons
            disableAllButtons();
        }
    }
    
    var strButton = "btnKey" + cLetter;
    var button = document.getElementById(strButton);
    button.setAttribute("disabled", "disabled");
}

function insertLetter(intIndex, cLetter)
{
    //alert(intIndex + " = " + cLetter);
    //alert(strGuess.substring(0, intIndex) + cLetter + strGuess.substring((intIndex+1), strGuess.length));
    strGuess = strGuess.substring(0, intIndex) + cLetter + strGuess.substring((intIndex+1), strGuess.length);
    setGuessWord(strGuess);
}

function setGuessWord(str)
{
    document.getElementById("guessWord").innerHTML = str;
}

// This will be used to disable all the buttons. We might not need this button later, but we will need to figure
//      out what to do after you lose.
function disableAllButtons() {
    // btnA
    var button = document.getElementById("btnKeyA");
    button.setAttribute("disabled", "disabled");
    
    // btnB
    var button = document.getElementById("btnKeyB");
    button.setAttribute("disabled", "disabled");
    
    // btnC
    var button = document.getElementById("btnKeyC");
    button.setAttribute("disabled", "disabled");
    
    // btnD
    var button = document.getElementById("btnKeyD");
    button.setAttribute("disabled", "disabled");
    
    // btnE
    var button = document.getElementById("btnKeyE");
    button.setAttribute("disabled", "disabled");
    
    // btnF
    var button = document.getElementById("btnKeyF");
    button.setAttribute("disabled", "disabled");
    
    // btnG
    var button = document.getElementById("btnKeyG");
    button.setAttribute("disabled", "disabled");
    
    // btnH
    var button = document.getElementById("btnKeyH");
    button.setAttribute("disabled", "disabled");
    
    // btnI
    var button = document.getElementById("btnKeyI");
    button.setAttribute("disabled", "disabled");
    
    // btnJ
    var button = document.getElementById("btnKeyJ");
    button.setAttribute("disabled", "disabled");
    
    // btnK
    var button = document.getElementById("btnKeyK");
    button.setAttribute("disabled", "disabled");
    
    // btnL
    var button = document.getElementById("btnKeyL");
    button.setAttribute("disabled", "disabled");
    
    // btnM
    var button = document.getElementById("btnKeyM");
    button.setAttribute("disabled", "disabled");
    
    // btnN
    var button = document.getElementById("btnKeyN");
    button.setAttribute("disabled", "disabled");
    
    // btnO
    var button = document.getElementById("btnKeyO");
    button.setAttribute("disabled", "disabled");
    
    // btnP
    var button = document.getElementById("btnKeyP");
    button.setAttribute("disabled", "disabled");
    
    // btnQ
    var button = document.getElementById("btnKeyQ");
    button.setAttribute("disabled", "disabled");
    
    // btnR
    var button = document.getElementById("btnKeyR");
    button.setAttribute("disabled", "disabled");
    
    // btnS
    var button = document.getElementById("btnKeyS");
    button.setAttribute("disabled", "disabled");
    
    // btnT
    var button = document.getElementById("btnKeyT");
    button.setAttribute("disabled", "disabled");
    
    // btnU
    var button = document.getElementById("btnKeyU");
    button.setAttribute("disabled", "disabled");
    
    // btnV
    var button = document.getElementById("btnKeyV");
    button.setAttribute("disabled", "disabled");
    
    // btnW
    var button = document.getElementById("btnKeyW");
    button.setAttribute("disabled", "disabled");
    
    // btnX
    var button = document.getElementById("btnKeyX");
    button.setAttribute("disabled", "disabled");
    
    // btnY
    var button = document.getElementById("btnKeyY");
    button.setAttribute("disabled", "disabled");
    
    // btnZ
    var button = document.getElementById("btnKeyZ");
    button.setAttribute("disabled", "disabled");
}