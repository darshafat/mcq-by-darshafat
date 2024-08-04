const questions = [
    { question: "What is the main function of the CPU?", options: ["Store data permanently", "Process instructions", "Display graphics", "Control peripherals"], correct: 1 },
    { question: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Read Application Memory", "Rapid Access Memory"], correct: 1 },
    { question: "Which device is used for input?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], correct: 2 },
    { question: "What is the purpose of an operating system?", options: ["Run applications", "Manage hardware", "Store data", "Display graphics"], correct: 1 },
    { question: "What does URL stand for?", options: ["Uniform Resource Locator", "Universal Resource Locator", "Unique Resource Locator", "Uniform Reference Locator"], correct: 0 },
    { question: "Which component is considered the brain of the computer?", options: ["Motherboard", "RAM", "CPU", "Hard Drive"], correct: 2 },
    { question: "What is the primary function of a web browser?", options: ["Edit documents", "Browse the internet", "Play games", "Send emails"], correct: 1 },
    { question: "What does GUI stand for?", options: ["General User Interface", "Graphical User Interface", "Guided User Interface", "Generalized User Interface"], correct: 1 },
    { question: "What is the basic unit of information in a computer?", options: ["Byte", "Bit", "Kilobyte", "Megabyte"], correct: 1 },
    { question: "Which of the following is a programming language?", options: ["HTML", "CSS", "JavaScript", "JPEG"], correct: 2 },
    { question: "What does HDD stand for?", options: ["High Definition Drive", "Hard Disk Drive", "High Density Drive", "Hard Data Drive"], correct: 1 },
    { question: "Which of these is a non-volatile memory?", options: ["RAM", "Cache", "ROM", "Registers"], correct: 2 },
    { question: "What is the function of an input device?", options: ["Output data", "Store data", "Enter data", "Process data"], correct: 2 },
    { question: "Which key is used to refresh a webpage?", options: ["F5", "F1", "Ctrl+S", "Alt+Tab"], correct: 0 },
    { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Processing Unit", "Central Programming Unit", "Computer Programming Unit"], correct: 0 },
    { question: "What type of software is an antivirus?", options: ["System software", "Application software", "Utility software", "Development software"], correct: 2 },
    { question: "Which file extension is typically used for images?", options: [".jpg", ".exe", ".txt", ".mp3"], correct: 0 },
    { question: "What is a URL used for?", options: ["Storing data", "Locating web resources", "Processing information", "Running applications"], correct: 1 },
    { question: "What is the smallest unit of data?", options: ["Byte", "Bit", "Kilobyte", "Gigabyte"], correct: 1 },
    { question: "Which device is used to display output from a computer?", options: ["Keyboard", "Mouse", "Monitor", "Scanner"], correct: 2 },
    { question: "What does the 'Save As' option do?", options: ["Creates a new file", "Renames a file", "Saves a file with a different name", "Deletes a file"], correct: 2 }
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
