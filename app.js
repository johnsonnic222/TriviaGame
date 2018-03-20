$( document ).ready(function() {


var trivia = {
    questions: [{
    
    question: "Who sings these lyrics: Born down in a dead man's town. The first kick I took was when I hit the ground. You end up like a dog that's been beat too much, Till you spend half your life just covering up.",
    array: ['Survivor', 'Bon Jovi', 'Queen', 'Bruce Springsteen'],
    id: 'one',
    answer: 3
    //image: "image/bruce.gif"
}, {
    question: "Which 80s Clash song, when re-released in 1991, went straight to number one in the UK?",
    array: ['London Calling', 'Straight to Hell', 'Rock the Casbah', 'Should I Stay or Should I Go?'],
    id: 'two',
    answer: 3
    //image: "images/clash.gif"
}, {
    question: "Name the theme song from the Breakfast Club",
    array: ['Billy Jean', 'Lets Dance', 'Dont you forget about me', 'Like a Virgin'],
    id: 'three',
    answer: 2
    //image: "images/club.gif"
},  {
    question: "During Johnny and Baby's final stage dance of the movie 'Dirty Dancing', what song is playing?",
    array: ['Hungry Eyes', '(Ive Had) The Time Of My Life','Be my Baby', 'Overload'],
    id: 'four',
    answer: 1
    //image: "images/dirty.gif"
}, {
    question: "Who sings these lyrics: Now and then when I see her face She takes me away to that special place And if I stared too long I'd probably break down and cry.",
    array: ['Europe', 'Guns N Roses', 'Aerosmith', 'AC DC'],
    id: 'five',
    answer: 1
    //image: "images/guns.gif"
}, {
    question: "Who sings, Hey Mickey",
    array: ['Madona', 'Tony Basil', 'Joan Jett', 'Cyndi Lauper'],
    id: 'six',
    answer: 1
    //image: "images/toni.gif"
}, {
    question: "Who sings these lyrics: Turn it down you say, Well all I got to say to you is time and time again I say, NO! NO NO, NO, NO, NO, NO!",
    array: ['Twisted Sister', 'Foreigner', 'Ozzy Osbourne', 'Van Halen'],
    id: 'seven',
    answer: 0
    //image: "images/twisted.gif"
},  {
    question: "The pencil-sketch animation technique used in the A-ha video Take On Me was known as what?",
    array: ['Onion skinning', 'Still motion', 'Pinscreen', 'Rotoscoping'],
    id: 'eight',
    answer: 3
    //image: "images/8.gif"
}],
}


// test
//var message = 'Game Over!';
// var $message = $('#message');
// test


$("#startGame").click(function(){
    $('.container').show();
    console.log('hello');
    $(this).hide();
});

// These events start the timer: set the number of seconds the guesser has 
var number = 100;
$('#remainingTime').click(run);

// This function enables the number of seconds to decrease with time, and to display
// the result of that decrease until time is up. 
function decrement(){
    number--;
    $('#remainingTime').html('<h2>' + number + " Seconds"+'</h2>');
    if (number === 0){
    stop();
    $('#message').html('Times Up');
    checkAnswers();
    }
}
// the run function sets the spacing of the decrement function's time interval so that
// it can be equal to a second per number decrement.
function run(){
    counter = setInterval(decrement, 1000);
}

function stop(){
// Clears our "counter" interval. The interval name is passed to the clearInterval function.
    clearInterval(counter);
}
run();

function myFunction(data) {
var output = "<form id='one'>"+ data.question +"<br>";
// this variable to access the question object's possibles array needed to answer each question
var array = data.array;
// a for loop to go through the answers for each question to add the values of each answers
// array and using ouput, add them as radio buttons to the question to which they are
// associated
for (var i = 0; i < array.length; i++) {
    var game = array[i];
    output = output + "<input type='radio' name='"+ data.id +"' value ="+ i +">"+game;
}
return output + "</form>";
}
window.myFunction = myFunction;

// this function takes the template created in the last function and by appending it,
// allows it to be displayed on the page
function buildQuestions(){
var questionHTML = ''
for (var i = 0; i<trivia.questions.length; i++) {
    questionHTML = questionHTML + myFunction(trivia.questions[i]);
}
$('#questions-wrapper').append(questionHTML);
}

// function that 
function isCorrect(question){
var answers = $('[name='+question.id+']');
var correct = answers.eq(question.answer);
var isChecked = correct.is(':checked');
return isChecked;
}

// call the buildQuestions function
buildQuestions();

// function to build the display of guesser results
function resultsTemplate(question){
var htmlBlock = ('<div>')
htmlBlock = htmlBlock + question.question + ': ' + isChecked;
return htmlBlock + "</div>";
}

// function to tabulate the guesser results
function checkAnswers (){

// variables needed to hold results
var resultsHTML = '';
var guessedAnswers = [];
var correct = 0;
var incorrect = 0;
var unAnswered =0

// for loop iterates through each question and passes the questions at each index first into
// the isCorrect function to see if they match the indices of correct answers, and if they do,
// increments up the correct score
for (var i = 0; i<trivia.questions.length; i++) {
    if (isCorrect(trivia.questions[i])) {
        correct++;
    } else {
// then this statement runs the questions at each index through the checkAnswered function
// to determine whether the user clicked an answer, or did not click an answer, so that
// incorrect and unAnswered scores can be delineated from each other
        if (checkAnswered(trivia.questions[i])) {
            incorrect++;
        } else {
            unAnswered++;
        }
    }

}
// display the results of the function in the results div and use strings of text to relate the
// results of the for loop with their corresponding values
$('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
}

// this function checks whether the guesser actually checked an answer for each of the 
// questions
function checkAnswered(question){
var anyAnswered = false;
var answers = $('[name='+question.id+']');
// the for loop creates a condition to check if the buttons were checked and and then sets
// the anyAnswered variable to true if they were
for (var i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
        anyAnswered = true;
    }
}
// then return the anyAnswered variable so it can be tabulated in the last function to distinguish
// between incorrect answers and those answers that were not attempted
return anyAnswered;

}

// create a function with an onclick event for the doneButton that both checks the Answers 
// and stops the clock when "done" button is pressed
$('#doneButton').on('click', function() {
checkAnswers();
stop();
$("#messageDiv").html("Game Over!");
})
});
















