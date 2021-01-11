/*
 * Auto-generated content from the Brackets New Project extension.  Enjoy!
 */

/* Gonna need to break down all of this and put it in the right order at some point. ugh... */
/* NOTE (1/3/2021): Currently all the words must be in all caps or the code won't work -- need to fix this at a later date. */

const objCategorySeasons = {name: "Seasons", words: ["SUMMER", "WINTER", "FALL", "SPRING", "AUTUMN"]};
const objCategoryNumbers = {name: "Numbers", words: ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN"]};
const objCategoryColors = {name: "Colors", words: ["RED", "YELLOW", "BLUE", "GREEN", "WHITE", "BROWN", "PINK", "ORANGE", "PURPLE", "TOURQUOISE", "TAN", "BLACK", "BEIGE", "GREY", "VIOLET", "MAROON"]};
const objCategoryStates = {name: "States", words: ["ALABAMA", "ALASKA", "ARIZONA", "ARKANSAS", "CALIFORNIA", "COLORADO", "CONNECTICUT", "DELAWARE", "FLORIDA", "GEORGIA", "HAWAII", "IDAHO", "ILLINOIS", "INDIANA", "IOWA", "KANSAS", "KENTUCKY", "LOUISIANA", "MAINE", "MARYLAND", "MASSACHUSETTS", "MICHIGAN", "MINNESOTA", "MISSISSIPPI", "MISSOURI", "MONTANA", "NEBRASKA", "NEVADA", "NEW HAMPSHIRE", "NEW JERSEY", "NEW MEXICO", "NEW YORK", "NORTH CAROLINA", "NORTH DAKOTA", "OHIO", "OKLAHOMA", "OREGON", "PENNSYLVANIA", "RHODE ISLAND", "SOUTH CAROLINA", "SOUTH DAKOTA", "TENNESSEE", "TEXAS", "UTAH", "VERMONT", "VIRGINIA", "WASHINGTON", "WEST VIRGINIA", "WISCONSIN", "WYOMING"]};

// Base buttons to go through for the scanning. -- ABC --
const baseScanningABC = ["btnKeyA", "btnKeyB", "btnKeyC", "btnKeyD", "btnKeyE", "btnKeyF", "btnKeyG", "btnKeyH", "btnKeyI", "btnKeyJ", "btnKeyK", "btnKeyL", "btnKeyM", "btnKeyN", "btnKeyO", "btnKeyP", "btnKeyQ", "btnKeyR", "btnKeyS", "btnKeyT", "btnKeyU", "btnKeyV", "btnKeyW", "btnKeyX", "btnKeyY", "btnKeyZ"];
// Base buttons to go through for the scanning. -- QWERTY --
const baseScanningQWERTY = ["btnKeyQ", "btnKeyW", "btnKeyE", "btnKeyR", "btnKeyT", "btnKeyY", "btnKeyU", "btnKeyI", "btnKeyO", "btnKeyP", "btnKeyA", "btnKeyS", "btnKeyD", "btnKeyF", "btnKeyG", "btnKeyH", "btnKeyJ", "btnKeyK", "btnKeyL", "btnKeyZ", "btnKeyX", "btnKeyC", "btnKeyV", "btnKeyB", "btnKeyN", "btnKeyM"];

var scanBoard;
var scanSpot = -1;

let wordsLeft = objCategorySeasons.words.slice(0);
var strWord = getRandomWord(0, wordsLeft.length);
var strGuess = getMyEmptyWord(strWord);
document.getElementById("guessWord").innerHTML = strGuess;
var intFailedAttempts = 6;
var currBtnValue = 64;
var oneSwitchGoing = false;
var oneSwitchActivated = false;
const strOneSwitch = "Turn One Switch:";
const strOn = " ON";
const strOff = " OFF";
var endRound = false;
// Change every x seconds (1 second default)
var oneSwitchSpeed = 1000;
// This will be where the id is stored so we can turn off the timer if needed
var scanTime;
// Turn the keyboard off when the modal is up
var modalOn = false;

// Modal Items are going here
// Get the modal
var modalDefeat = document.getElementById("modalDefeat");
var modalVictory = document.getElementById("modalVictory");
// Get the button that opens the modal -- This will be gone later and we will using something else to trigger the modal calls
var btnDefeat = document.getElementById("btnDefeat");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// Get our elements here I guess.
//document.getElementById("guessWord").innerHTML = strGuess;



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
    if (oneSwitchGoing)
    {
        console.log("Inside if in changeButton()...");
        
        // Set currBtnValue to before A's value if it is Z's value
        if (currBtnValue === 90){
            currBtnValue = 64;
        }
        
        if (scanSpot >= scanBoard.length - 1) {
            scanSpot = -1;
        }
        
        // Iterate up one through the list
        ++currBtnValue;
        ++scanSpot;

        //currBtnValue === 65
        if (scanSpot === 0){
            // Set Z to grey
            document.getElementById(scanBoard[scanBoard.length - 1]).style.backgroundColor = "#e7e7e7";
        } else {
            //document.getElementById("btn" + getCode(currBtnValue - 1)).style.backgroundColor = "#e7e7e7";
            document.getElementById(scanBoard[scanSpot - 1]).style.backgroundColor = "#e7e7e7";
        }
        
        // Change the presentation of our current button
        document.getElementById(scanBoard[scanSpot]).style.backgroundColor = "#FF0000";
        
        //document.getElementById(baseScanningABC[scanSpot]).focus();
        //console.log(scanSpot);
        
        scanTime = setTimeout(changeButton, oneSwitchSpeed);
    }
}

function startRound() {
    // Restarting the round, so we must reset the endRound to false
    endRound = false;
    
    setWordsLeft(document.getElementById("categorySelector").value);
    
    // Get and set the new word
    strWord = getRandomWord(0, wordsLeft.length);
    strGuess = getMyEmptyWord(strWord);
    
    // Reset all the buttons
    enableAllButtons();
    
    // Reset our GuessWord (strGuess), Tries (intFailedAttempts), and OneSwitch Counter (currBtnValue)
    setGuessWord(strGuess);
    intFailedAttempts = 6;
    currBtnValue = 64;
    
    // Reset the picture
    document.getElementById("tryImage").src = "images/Flower_" + intFailedAttempts + "-6.png";
    
    // Start the scanner if One Switch activated
    oneSwitchActivated ? oneSwitchGoing = true : oneSwitchGoing = false;
    
    console.log("Round started...");
    console.log("Is the switch activated? " + oneSwitchActivated);
    console.log("And is the switch going? " + oneSwitchGoing);
    
    // Setting the speed for scanning (One Switch)
    oneSwitchSpeed = document.getElementById("txtSwitchSpeed").value * 1000;
    
    // Setting the interval for the scanning (One Switch)
    scanOff();
    scanBegin();
    
    // Set the scanning equal to a copy of the selected keyboard style
    scanBoard = baseScanningABC.slice(0);
    
    // Remove the focus from the button
    document.getElementById("startBtn").blur();
}

function setWordsLeft(strCategory) {
    // This is our default for now
    let pickedCategory;
    
    switch (strCategory) {
        case "Seasons":
            pickedCategory = objCategorySeasons.words.slice(0);
            break;
        case "Numbers":
            pickedCategory = objCategoryNumbers.words.slice(0);
            break;
        case "Colors":
            pickedCategory = objCategoryColors.words.slice(0);
            break;
        case "States":
            pickedCategory = objCategoryStates.words.slice(0);
            break;
        default:
            pickedCategory = objCategorySeasons.words.slice(0);
    }
    
    wordsLeft = pickedCategory;
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
        //var currBtn = "btn" + getCode(currBtnValue);
        //document.getElementById(currBtn).click();
        if (oneSwitchGoing){
            alert(scanBoard[scanSpot]);
            document.getElementById(scanBoard[scanSpot]).click();
            --scanSpot;
        }
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
        document.getElementById(myBtn).click();
    }
}

// Turns on the scanning for OneSwitch
function switchOneSwitch() {
    oneSwitchActivated = !oneSwitchActivated;
    let strMessage = strOneSwitch + (oneSwitchActivated ? strOff : strOn);
    document.getElementById("btnOneSwitch").value = strMessage;
}

// Turns the scanning off
function scanOff() {
    clearTimeout(scanTime);
    oneSwitchGoing = false;
}

// Begins scanning from the beginning
function scanBegin() {
    // Start the scanner if One Switch activated
    oneSwitchActivated ? oneSwitchGoing = true : oneSwitchGoing = false;
    
    // Reset all scanning variables
    scanSpot = -1;
    currBtnValue = 64;
    
    // Start the scanning back up
    scanTime = setTimeout(changeButton, oneSwitchSpeed);
}

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
            if (strWord[i] == " ") {
                strEmpty += "  "; // Creating 2 spaces because one space is just too hard to notice
            } else {
                strEmpty += "_";
            }
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
    
    // If we have a modal up then don't let anything happen on the screen behind it
    if (modalOn) {
        return;
    }
    
    for (var i = 0; i < strWord.length; i++) {
        if (strWord.charAt(i) == cLetter) {
            places += i + " ";
            //alert("k");
            bFound = true;
            // Insert the letter we found into all the appropriate places
            insertLetter(i, cLetter);
        }
    }
    
    // Check to see if we won
    if (!strGuess.includes("_")){
        modalVictoryOn();
    }
    
    // If the letter is no where to be found then update the misses
    if (!bFound) {
        --intFailedAttempts;
        var imgSrc = "images/Flower_" + intFailedAttempts + "-6.png";
        document.getElementById("tryImage").src = imgSrc;
        if (0 === intFailedAttempts) {
            modalDefeatOn();
            // Use this for now to disable all the buttons
        }
    }
    
    var strButton = "btnKey" + cLetter;
    var button = document.getElementById(strButton);
    button.disabled = true;
    scanBoard.splice(scanBoard.indexOf(strButton), 1);
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

/* MODAL CODE SECTION */
// When the user clicks the button, open the modal 
function modalDefeatOn() {
    // Take the modalOn variable to true
    modalOn = true;
    
    scanOff();
    document.getElementById("strDefeat").innerHTML = "You missed it this time.<br>The word was: <u>" + strWord + "</u>";
    modalDefeat.style.display = "block";
}

function modalVictoryOn() {
    // Take the modalOn variable to true
    modalOn = true;
    
    scanOff();
    document.getElementById("strVictory").innerHTML = "Good Job! You have found the word!";
    modalVictory.style.display = "block";
}

function modalEndRoundWin() {
    // Take the modalOn variable to true
    modalOn = true;
    
    scanOff();
    endRound = true;
    document.getElementById("strVictory").innerHTML = "You have discovered all the words for this category!<br>Great Job! We'll see you back at base!";
    modalVictory.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function modalOff() {
    // Take the modalOn variable to false from turning off the modal
    modalOn = false;
    
    if (modalVictory.style.display == "block"){
        modalVictory.style.display = "none";
        if (!endRound) {
            newWord();
        } else {
            disableAllButtons();
            setGuessWord("VICTORY");
        }
    } else {
        modalDefeat.style.display = "none";
        disableAllButtons();
        setGuessWord("DEFEAT");
    }
}


// This will be used to disable all the buttons. We might not need this button later, but we will need to figure
//      out what to do after you lose.
function disableAllButtons() {
    // btnA
    document.getElementById("btnKeyA").disabled = true;
    
    // btnB
    document.getElementById("btnKeyB").disabled = true;
    
    // btnC
    document.getElementById("btnKeyC").disabled = true;
    
    // btnD
    document.getElementById("btnKeyD").disabled = true;
    
    // btnE
    document.getElementById("btnKeyE").disabled = true;
    
    // btnF
    document.getElementById("btnKeyF").disabled = true;
    
    // btnG
    document.getElementById("btnKeyG").disabled = true;
    
    // btnH
    document.getElementById("btnKeyH").disabled = true;
    
    // btnI
    document.getElementById("btnKeyI").disabled = true;
    
    // btnJ
    document.getElementById("btnKeyJ").disabled = true;
    
    // btnK
    document.getElementById("btnKeyK").disabled = true;
    
    // btnL
    document.getElementById("btnKeyL").disabled = true;
    
    // btnM
    document.getElementById("btnKeyM").disabled = true;
    
    // btnN
    document.getElementById("btnKeyN").disabled = true;
    
    // btnO
    document.getElementById("btnKeyO").disabled = true;
    
    // btnP
    document.getElementById("btnKeyP").disabled = true;
    
    // btnQ
    document.getElementById("btnKeyQ").disabled = true;
    
    // btnR
    document.getElementById("btnKeyR").disabled = true;
    
    // btnS
    document.getElementById("btnKeyS").disabled = true;
    
    // btnT
    document.getElementById("btnKeyT").disabled = true;
    
    // btnU
    document.getElementById("btnKeyU").disabled = true;
    
    // btnV
    document.getElementById("btnKeyV").disabled = true;
    
    // btnW
    document.getElementById("btnKeyW").disabled = true;
    
    // btnX
    document.getElementById("btnKeyX").disabled = true;
    
    // btnY
    document.getElementById("btnKeyY").disabled = true;
    
    // btnZ
    document.getElementById("btnKeyZ").disabled = true;
}

// This will be used to enable all the buttons. We might not need this button later, but we will need to figure
//      out what to do after you lose.
function enableAllButtons() {
    // btnA
    document.getElementById("btnKeyA").disabled = false;
    document.getElementById("btnKeyA").style.backgroundColor = "#e7e7e7";
    
    // btnB
    document.getElementById("btnKeyB").disabled = false;
    document.getElementById("btnKeyB").style.backgroundColor = "#e7e7e7";
    
    // btnC
    document.getElementById("btnKeyC").disabled = false;
    document.getElementById("btnKeyC").style.backgroundColor = "#e7e7e7";
    
    // btnD
    document.getElementById("btnKeyD").disabled = false;
    document.getElementById("btnKeyD").style.backgroundColor = "#e7e7e7";
    
    // btnE
    document.getElementById("btnKeyE").disabled = false;
    document.getElementById("btnKeyE").style.backgroundColor = "#e7e7e7";
    
    // btnF
    document.getElementById("btnKeyF").disabled = false;
    document.getElementById("btnKeyF").style.backgroundColor = "#e7e7e7";
    
    // btnG
    document.getElementById("btnKeyG").disabled = false;
    document.getElementById("btnKeyG").style.backgroundColor = "#e7e7e7";
    
    // btnH
    document.getElementById("btnKeyH").disabled = false;
    document.getElementById("btnKeyH").style.backgroundColor = "#e7e7e7";
    
    // btnI
    document.getElementById("btnKeyI").disabled = false;
    document.getElementById("btnKeyI").style.backgroundColor = "#e7e7e7";
    
    // btnJ
    document.getElementById("btnKeyJ").disabled = false;
    document.getElementById("btnKeyJ").style.backgroundColor = "#e7e7e7";
    
    // btnK
    document.getElementById("btnKeyK").disabled = false;
    document.getElementById("btnKeyK").style.backgroundColor = "#e7e7e7";
    
    // btnL
    document.getElementById("btnKeyL").disabled = false;
    document.getElementById("btnKeyL").style.backgroundColor = "#e7e7e7";
    
    // btnM
    document.getElementById("btnKeyM").disabled = false;
    document.getElementById("btnKeyM").style.backgroundColor = "#e7e7e7";
    
    // btnN
    document.getElementById("btnKeyN").disabled = false;
    document.getElementById("btnKeyN").style.backgroundColor = "#e7e7e7";
    
    // btnO
    document.getElementById("btnKeyO").disabled = false;
    document.getElementById("btnKeyO").style.backgroundColor = "#e7e7e7";
    
    // btnP
    document.getElementById("btnKeyP").disabled = false;
    document.getElementById("btnKeyP").style.backgroundColor = "#e7e7e7";
    
    // btnQ
    document.getElementById("btnKeyQ").disabled = false;
    document.getElementById("btnKeyQ").style.backgroundColor = "#e7e7e7";
    
    // btnR
    document.getElementById("btnKeyR").disabled = false;
    document.getElementById("btnKeyR").style.backgroundColor = "#e7e7e7";
    
    // btnS
    document.getElementById("btnKeyS").disabled = false;
    document.getElementById("btnKeyS").style.backgroundColor = "#e7e7e7";
    
    // btnT
    document.getElementById("btnKeyT").disabled = false;
    document.getElementById("btnKeyT").style.backgroundColor = "#e7e7e7";
    
    // btnU
    document.getElementById("btnKeyU").disabled = false;
    document.getElementById("btnKeyU").style.backgroundColor = "#e7e7e7";
    
    // btnV
    document.getElementById("btnKeyV").disabled = false;
    document.getElementById("btnKeyV").style.backgroundColor = "#e7e7e7";
    
    // btnW
    document.getElementById("btnKeyW").disabled = false;
    document.getElementById("btnKeyW").style.backgroundColor = "#e7e7e7";
    
    // btnX
    document.getElementById("btnKeyX").disabled = false;
    document.getElementById("btnKeyX").style.backgroundColor = "#e7e7e7";
    
    // btnY
    document.getElementById("btnKeyY").disabled = false;
    document.getElementById("btnKeyY").style.backgroundColor = "#e7e7e7";
    
    // btnZ
    document.getElementById("btnKeyZ").disabled = false;
    document.getElementById("btnKeyZ").style.backgroundColor = "#e7e7e7";
    
    // Enable the whole board for scanning
    scanBoard = baseScanningABC.slice(0);
}

/* On to the new word */
function newWord() {
    // Remove the just solved word from the list
    /*
    wordsLeft.splice(0, 1);
    */
    wordsLeft.splice(wordsLeft.indexOf(strWord), 1);
    //let frontRemain = wordsLeft.splice(0, (wordsLeft.indexOf(strWord) +1));
    //alert(frontRemain + " &&& " + wordsLeft);
    if (wordsLeft.length == 0){
        modalEndRoundWin();
        return;
    }
    
    // Get and set the new word
    strWord = getRandomWord(0, wordsLeft.length);
    strGuess = getMyEmptyWord(strWord);
    
    // Reset all the buttons
    enableAllButtons();
    
    // Reset our GuessWord (strGuess), Tries (intFailedAttempts), and OneSwitch Counter (currBtnValue)
    setGuessWord(strGuess);
    intFailedAttempts = 6;
    currBtnValue = 64;
    
    // Reset the picture
    document.getElementById("tryImage").src = "images/Flower_" + intFailedAttempts + "-6.png";
    
    // Start the scanning if that is turned on
    scanBegin();
}

/* Random Number Generator needed to go through our current Category */
function getRandomWord(min, max) {
  return wordsLeft[Math.floor(Math.random() * (max - min) ) + min];
}