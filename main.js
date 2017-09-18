//hangman
$(document).ready(function () {
    console.log("ready!");
});

//Global Variables
let playerOutput = 0,
    maskedWord = "",
    matches = 0,
    tries = 0,
    maxTries = 6;
uiPieces = {
    play: $("#play"),
    answers: $("#answers"),
    guessForm: $("#guessForm"),
    userGuess: $("#userGuess"),
    guessButton: $("#guessButton"),
    wrongLetters: $("#wrongLetters")
},
    playerInput = userGuess;

//Secret Words
const secretWords = [
    'JIG',
    'BOUNTY',
    'WANTED',
    'JUDGE',
    'SCARED',
    'RENEGADE',
    'LAW',
    'MAMA'
]

//Random secretWord Algorithm (global variables)
const random = Math.floor((Math.random() * (secretWords.length)));
let wordChosen = secretWords[random];

//Button Handlers
$(function() {;

    uiPieces.guessButton.on('click', function(e) {
        e.preventDefault();
        checkLetters();
    })

})

//Generate + Display Masked Word
function init() {
    for (var i = 0; i < wordChosen.length; i++) {
        maskedWord += "_";
    }
    uiPieces.answers.html(maskedWord);
    uiPieces.userGuess.focus();
};

//Answer Check Function / Replace '_' With Correctly Guessed Letter
function checkLetters () {
    upperCaseLetter = "";
    matches = false;

    if (uiPieces.userGuess && uiPieces.userGuess.val()) {
        upperCaseLetter = $.trim(uiPieces.userGuess.val().toUpperCase());
    }    

    if (upperCaseLetter) {
        for (let i = 0; i < maskedWord.length; ++i) {
            if (secretWords[random].charAt(i) === upperCaseLetter) {
                maskedWord = maskedWord.substr(0, i) + upperCaseLetter + maskedWord.substr(i + 1);
                matches = true;
            }
        }
        if (!matches) {
            uiPieces.wrongLetters.append(upperCaseLetter + " ");
            matches = false;
            ++tries;
            }
    }

        //Check Lose / Win Logic
        if (hasUserLost()) {
            userLost();
        } else if (hasUserWon()) {
            userWon();
        } else {
            uiPieces.answers.html(maskedWord);
        }

};

    //Lose / Win Display Functions
    function userLost() {
        alert("You're a deadman, Hangman!");
    };

    function userWon() {
        uiPieces.answers.html(wordChosen);
        alert("You win. Escape the gallows while you can, Hangman!");
    };

    //Lose / Win Logic
    function hasUserLost() {
        return (tries >= maxTries);
    };

    function hasUserWon() {
        return (maskedWord === wordChosen);
    };

    //Onload Functions
    window.onload = init();