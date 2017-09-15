// hangman
$(document).ready(function () {
    console.log("ready!");
});
const answerWords = [
    ["D", "O", "G"],
    ["C", "A", "T"],
    ["P", "U", "G"],
    ["F", "I", "G"],
]

var random = Math.floor((Math.random() * (answerWords.length - 1)));
var wordChosen = answerWords[random]; // the word to guess will be chosen from the array above
var word = new Array(wordChosen.length);

let answerDisplay = [];

var tries = 0;

// every letter in the word is symbolized by an underscore in the answers div
for (var i = 0; i < word.length; i++) {
    word[i] = "_ ";
}

// displays the secret word with underscores
function printWord() {
    for (var i = 0; i < word.length; i++) {
        var answers = document.getElementById("answers");
        var newWord = document.createTextNode(word[i]);
        answers.appendChild(newWord);
    }
}

let playerInput = $('#playerInput');
let answers = document.getElementById("answers");
let correct = 0;



//checks if the the letter provided by the user matches one or more of the letters in the word
var checkLetters = function (e) {
    e.preventDefault();
    //playerInput = e.target.value;
    let playerInput = $('#playerInput').val();
    //var playerInput = e.target.value; //input value
    //var b = f.elements["userGuess"]; 
    //var letterGiven = b.value; // the letter provided by the user
    let upperCaseLetter = playerInput.toUpperCase();
    for (var i = 0; i < wordChosen.length; i++) {
        if (wordChosen[i] === upperCaseLetter) {
            word[i] = upperCaseLetter + " ";
            correct = true;
            if (correct === true) {
                let upperCaseLetter = playerInput.toUpperCase();
                let word = upperCaseLetter + " ";
                var character = document.createTextNode(word);
                $("#answers").append(character);
            }
        }
       // upperCaseLetter = "";
    }

    //deletes the guessfield and replaces it with the new one
    var answers = document.getElementById("answers");
    answers.innerHTML = printWord();


    //gives action for when answer is incorrect
    if (!correct) {
        var wrongLetters = document.getElementById("wrongLetters");
        let playerInput = $('#playerInput').val();
        let upperCaseLetter = playerInput.toUpperCase();
        for (var i = 0; i < wordChosen.length; i++) {
            if (wordChosen[i] !== upperCaseLetter) {
                var character = document.createTextNode(" " + upperCaseLetter);
                $("#wrongLetters").append(character);
            }
        }
        //var character = document.createTextNode(" " + upperCaseLetter);
        //wrongLetters.appendChild(character);
        tries++;

    }

    //checks if all letters have been found
    var endOfGame = true;
    for (var i = 0; i < word.length; i++) {
        if (word[i] === "_ ") {
            endOfGame = false;
        }
    }
    if (endOfGame) {
        window.alert("You win! Get out of the Gallows!");
    }

    //once you got six wrong letters, you lose
    if (tries === 6) {
        window.alert("You're dead, hangman.");
    }
}

function init() {
    printWord();
}

$('#guessForm').submit(checkLetters);


window.onload = init(); 