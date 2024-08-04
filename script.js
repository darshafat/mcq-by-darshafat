const questions = [

    {

        question: "What does CPU stand for?",

        answers: ["Central Processing Unit", "Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],

        correct: "Central Processing Unit"

    },

    {

        question: "Which computer language is the most widely used?",

        answers: ["C", "Python", "JavaScript", "Java"],

        correct: "JavaScript"

    },

    {

        question: "What does RAM stand for?",

        answers: ["Random Access Memory", "Ready Access Memory", "Right Access Memory", "Randomly Accessed Memory"],

        correct: "Random Access Memory"

    },

    {

        question: "Which part is the brain of the computer?",

        answers: ["RAM", "CPU", "GPU", "Motherboard"],

        correct: "CPU"

    },

    {

        question: "What does ROM stand for?",

        answers: ["Read Only Memory", "Read On Memory", "Read Off Memory", "Ready Only Memory"],

        correct: "Read Only Memory"

    },

    {

        question: "Which of the following is an output device?",

        answers: ["Keyboard", "Mouse", "Monitor", "Scanner"],

        correct: "Monitor"

    },

    {

        question: "What does HTML stand for?",

        answers: ["HyperText Markup Language", "HyperText Markdown Language", "HyperLoop Machine Language", "HyperText Machine Language"],

        correct: "HyperText Markup Language"

    },

    {

        question: "Which device is used to connect a computer to a network?",

        answers: ["Router", "Switch", "Modem", "NIC"],

        correct: "NIC"

    },

    {

        question: "What is the full form of URL?",

        answers: ["Uniform Resource Locator", "Uniform Resource Link", "Uniform Registered Locator", "Unified Resource Link"],

        correct: "Uniform Resource Locator"

    },

    {

        question: "Which of the following is a type of non-volatile memory?",

        answers: ["RAM", "ROM", "Cache", "Register"],

        correct: "ROM"

    }

];

let currentQuestion = 0;

let score = 0;

const totalQuestions = questions.length;

const timeLimit = 600; // 10 minutes

let timeLeft = timeLimit;

let timer;

function startQuiz() {

    showQuestion(currentQuestion);

    startTimer();

    createNavigationButtons();

}

function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        document.getElementById('time').textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {

            clearInterval(timer);

            submitQuiz();

        }

    }, 1000);

}

function formatTime(seconds) {

    const min = Math.floor(seconds / 60);

    const sec = seconds % 60;

    return `${min}:${sec < 10 ? '0' : ''}${sec}`;

}

function showQuestion(index) {

    const questionContainer = document.getElementById('question-container');

    const question = questions[index];

    let html = `<h2>${index + 1}. ${question.question}</h2>`;

    question.answers.forEach(answer => {

        html += `<div>

                    <input type="radio" name="answer" value="${answer}">

                    <label>${answer}</label>

                 </div>`;

    });

    questionContainer.innerHTML = html;

}

function saveCurrentAnswer() {

    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {

        questions[currentQuestion].userAnswer = selectedAnswer.value;

    }

}

function nextQuestion() {

    saveCurrentAnswer();

    if (currentQuestion < totalQuestions - 1) {

        currentQuestion++;

        showQuestion(currentQuestion);

        updateIndicators();

    }

}

function prevQuestion() {

    saveCurrentAnswer();

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion(currentQuestion);

        updateIndicators();

    }

}

function submitQuiz() {

    saveCurrentAnswer();

    clearInterval(timer);

    calculateScore();

    showResults();

}

function calculateScore() {

    score = 0;

    questions.forEach(question => {

        if (question.userAnswer === question.correct) {

            score++;

        }

    });

}

function showResults() {

    const resultsContainer = document.getElementById('results-container');

    const quizContainer = document.getElementById('quiz-container');

    quizContainer.style.display = 'none';

    resultsContainer.style.display = 'block';

    let html = `<h2>Your score: ${score}/${totalQuestions}</h2>`;

    questions.forEach((question, index) => {

        html += `<div>

                    <h3>${index + 1}. ${question.question}</h3>

                    <p>Correct answer: ${question.correct}</p>

                    <p>Your answer: ${question.userAnswer || 'No answer'}</p>

                 </div>`;

    });

    html += `<button onclick="location.reload()">Take Test Again</button>`;

    resultsContainer.innerHTML = html;

}

function createNavigationButtons() {

    const navContainer = document.getElementById('navigation-container');

    let html = '';

    for (let i = 0; i < totalQuestions; i++) {

        html += `<button class="navigation-button" onclick="navigateToQuestion(${i})">${i + 1}</button>`;

    }

    navContainer.innerHTML = html;

}

function updateIndicators() {

    const navButtons = document.querySelectorAll('.navigation-button');

    navButtons.forEach((button, index) => {

        button.classList.remove('correct', 'wrong');

        if (questions[index].userAnswer) {

            if (questions[index].userAnswer === questions[index].correct) {

                button.classList.add('correct');

            } else {

                button.classList.add('wrong');

            }

        }

    });

}

function navigateToQuestion(index) {

    saveCurrentAnswer();

    currentQuestion = index;

    showQuestion(currentQuestion);

    updateIndicators();

}

startQuiz();