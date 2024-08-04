const questions = [
    {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
        answer: "Central Processing Unit"
    },
    {
        question: "What is the brain of the computer?",
        options: ["Motherboard", "CPU", "RAM", "Hard Drive"],
        answer: "CPU"
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
const userAnswers = Array(questions.length).fill(null);
const timeLimit = 10 * 60; // 10 minutes
let timeRemaining = timeLimit;
let timerInterval;

function startQuiz() {
    showQuestion();
    startTimer();
    updateIndicators();
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestionIndex];
    
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.options.map((option, index) => `
            <div class="option">
                <input type="radio" id="option${index}" name="option" value="${option}" onclick="selectOption('${option}')">
                <label for="option${index}" onclick="selectOption('${option}')">${option}</label>
            </div>
        `).join('')}
    `;
}

function selectOption(option) {
    userAnswers[currentQuestionIndex] = option;
    updateIndicators();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function submitQuiz() {
    clearInterval(timerInterval);
    showResults();
}

function showResults() {
    const resultsContainer = document.getElementById('results-container');
    const quizContainer = document.getElementById('quiz-container');
    const results = document.getElementById('results');
    
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    let resultHTML = userAnswers.map((answer, index) => {
        const question = questions[index];
        const correct = question.answer === answer;
        if (correct) score++;
        return `
            <p>
                Q${index + 1}: ${question.question}<br>
                Your answer: ${answer || "None"}<br>
                Correct answer: ${question.answer}<br>
                ${correct ? "Correct" : "Wrong"}
            </p>
        `;
    }).join('');
    
    results.innerHTML = `<h3>Your score: ${score} out of ${questions.length}</h3>${resultHTML}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers.fill(null);
    timeRemaining = timeLimit;
    
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('results-container').classList.add('hidden');
    
    showQuestion();
    startTimer();
    updateIndicators();
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
            return;
        }
        
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

function updateIndicators() {
    const indicatorsContainer = document.getElementById('indicators-container');
    indicatorsContainer.innerHTML = '';
    
    questions.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        indicator.textContent = index + 1;
        
        if (userAnswers[index] !== null) {
            indicator.classList.add('answered');
        }
        
        indicator.onclick = () => {
            currentQuestionIndex = index;
            showQuestion();
        };
        
        indicatorsContainer.appendChild(indicator);
    });
}

document.addEventListener('DOMContentLoaded', startQuiz);
