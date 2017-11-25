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
        wrongLetters: $("#wrongLetters"),
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

console.log(wordChosen)

//Button Handlers
$(function () {;

    uiPieces.guessButton.on('click', function (e) {
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
function checkLetters() {
    upperCaseLetter = "";
    matches = false;

    if (uiPieces.userGuess && uiPieces.userGuess.val()) {
        upperCaseLetter = $.trim(uiPieces.userGuess.val().toUpperCase());
        console.log(upperCaseLetter)
    }

    if (upperCaseLetter) {
        for (let i = 0; i < maskedWord.length; ++i) {
            if (secretWords[random].charAt(i) == upperCaseLetter) {
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

    //ANIMATION
    if (tries === 1) {
        $("#hangmanAnimation").attr('src', 'https://i.imgur.com/YR0fDCa.png');
    }
    if (tries === 2) {
        $("#hangmanAnimation").attr('src', 'https://i.imgur.com/leWlypa.png')
    }
    if (tries === 3) {
        $("#hangmanAnimation").attr('src', 'https://i.imgur.com/n1gNmEW.png')
    }
    if (tries === 4) {
        $("#hangmanAnimation").attr('src', 'https://i.imgur.com/U8r0BxO.png')
    }
    if (tries === 5) {
        $("#hangmanAnimation").attr('src', 'https://i.imgur.com/0GkSISb.png')
    }
    if (tries === 6) {
        $("#hangmanAnimation").attr('src', 'https://i.imgur.com/ACnSzIb.png')
    }
    else {
        $("hangmanAnimation").attr('src', 'https://i.imgur.com/FEWWXPw.png')
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

//Lose / Win Logic
function hasUserLost() {
    return (tries >= maxTries);
};

function hasUserWon() {
    return (maskedWord === wordChosen);
};

//Lose / Win Display Functions

function userLost() {
    setTimeout(function () {
        alert("You're a deadman, Hangman!");
    }, 100);
}

function userWon() {
    uiPieces.answers.html(wordChosen);
    setTimeout (function () {
        alert("You win. Escape the gallows while you can, Hangman!");
    }, 100);
};

//Onload Functions
window.onload = init();