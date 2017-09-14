// hangman
$(document).ready(function() {
    console.log("everything is ready");
});

const answerWords = [
    ["D", "O", "G"],
    ["C", "A", "T"],
    ["G", "O", "D"],
    ]
    var random = Math.floor((Math.random()*(answerWords.length-1))); 
    
    var wordChosen = answerWords[random]; // the word to guess will be chosen from the array above
    var word = new Array(wordChosen.length);
    var tries = 0;
    
    // every letter in the word is symbolized by an underscore in the guessfield
    for (var i = 0; i < word.length; i++){
        word[i] = "_ ";
    }
    
    // prints the guessfield
    function printWord(){
        for (var i = 0; i < word.length; i++){
        var answers = document.getElementById("answers");
        var newWord = document.createTextNode(word[i]);
        answers.appendChild(newWord);
        }
    }
    
    //checks if the the letter provided by the user matches one or more of the letters in the word
    var guessForm = function(){
        var f = document.rateform; 
        var b = f.elements["userGuess"]; 
        var letterGiven = b.value; // the letter provided by the user
        letterGiven = letterGiven.toUpperCase();
        for (var i = 0; i < wordChosen.length; i++){
            if(wordChosen[i] === letterGiven){
                word[i] = letterGiven + " ";
                var correct = true;
            }
        b.value = "";
        }
        
        //deletes the guessfield and replaces it with the new one
        var answers = document.getElementById("answers");
        answers.innerHTML = printWord();
        
        // if a guessed letter is not in the word, the letter will be put on the "wrong letters"-list and hangman grows
        if(!correct){
            var wrongLetters = document.getElementById("wrongLetters");
            var character = document.createTextNode(" " + character);
            wrongLetters.appendChild(character); 
            tries++;
            var hangman = document.getElementById("hangman");
        hangman.src = "http://www.writteninpencil.de/Projekte/Hangman/hangman" + tries + ".png";
        }
        
        //checks if all letters have been found
        var endOfGame = true;
        for (var i = 0; i < word.length; i++){
            if(word[i] === "_ "){
                endOfGame = false;
            }
        }
        if(endOfGame){
            window.alert("You win! Get out of the Gallows!");
        }
        
        //once you got six wrong letters, you lose
        if(tries === 6){
            window.alert("You're dead, hangman.");
        }
    }
    
    function init(){
        printWord();
    }
    
    window.onload = init;