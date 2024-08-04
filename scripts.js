const questions = [
    {
        question: "What is the main function of the CPU?",
        options: ["Store data permanently", "Process instructions", "Display graphics", "Control peripherals"],
        correct: 1
    },
    {
        question: "What does RAM stand for?",
        options: ["Read Access Memory", "Random Access Memory", "Read Application Memory", "Rapid Access Memory"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let timer;
let timeLeft = 60; // Time in seconds

document.addEventListener('DOMContentLoaded', function () {
    showQuestion();
    startTimer();
});

function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const question = questions[currentQuestionIndex];

    questionElement.textContent = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" id="option${index}" name="question${currentQuestionIndex}" value="${index}">
            <label for="option${index}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });
}

function nextQuestion() {
    saveCurrentAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0;
    }
    showQuestion();
}

function prevQuestion() {
    saveCurrentAnswer();
    currentQuestionIndex--;
    if (currentQuestionIndex < 0) {
        currentQuestionIndex = questions.length - 1;
    }
    showQuestion();
}

function saveCurrentAnswer() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    userAnswers[currentQuestionIndex] = selectedOption ? selectedOption.value : null;
}

function submitQuiz() {
    clearInterval(timer);
    let score = 0;
    questions.forEach((q, index) => {
        if (userAnswers[index] == q.correct) {
            score++;
        }
    });

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('result').textContent = `Your score: ${score} out of ${questions.length}`;

    showIndicators();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function showIndicators() {
    const indicatorsContainer = document.getElementById('indicators-container');
    indicatorsContainer.innerHTML = '';

    questions.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator ' + (userAnswers[index] != null ? 'answered' : 'unanswered');
        indicator.title = `Question ${index + 1}`;
        indicator.onclick = () => {
            currentQuestionIndex = index;
            showQuestion();
        };
        indicatorsContainer.appendChild(indicator);
    });
}
