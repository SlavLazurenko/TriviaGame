var panel = $("#quiz-area");

var countStartNumber = 30;


// Question set
var questions = [
    {
        question: "What is the name of the first operation in R6S?",
        answer: ["Black Ice", "Chimera", "Blood Orchid", "White Noise"],
        correctAnswer: "Black Ice",
        image: "assets/black-ice.png"
    },

    {
        question: "Who is the Spetsnaz operator?",
        answer: ["Buck", "Fuze", "Finka", "Bandit"],
        correctAnswer: "Fuze",
        image: "assets/fuze.gif"
    },

    {
        question: "Which operator uses an Active Defense system to intercept grenades?",
        answer: ["Jager", "Kaid", "Kapkan", "Maestro"],
        correctAnswer: "Jager",
        image: "assets/jager.gif"
    },
    
];

// Variable to hold our setInterval
var timer;

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function() {
        game.correct --;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
            console.log('Time Up!');
            game.timeUp()
        }
    },

    loadQuestion: function() {
        timer = setInterval(game.counter, 1000);
        panel.html("<h2>" + questions[this.currentQuestion] + "</h2>");
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append("<button class+'answer-button' id='button' data-name=''" + 
            questions[this.currentQuestion].answer[i]) + ">" + 
            questions[this.currentQuestion].answer[i] + "</button>";
        }
    },

    nextQuestion: function() {
        game.counter = countStartNumber;
        $("#counter-number").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function() {
        clearInterval(timer);

        $("counter-number").html(game.counter);
        panel.html("<h2>Out of Time!</h2>");
        panel.append("<h3>Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src='" + questions[this.currentQuestion].image + "'/>");
        
        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000)
        }
    },

    results: function() {
        clearInterval(timer);

        panel.html("<h2>All done, here's how you did!</h2>");

        $("#counter-number").html(game.counter);

        panel.append("<h3>Correct Answer:" + game.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
        panel.append("<br><button id='start-over'>Try Again</button>");
    }
}