body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}

.container {
    width: 80%;
    max-width: 800px;
    margin: 20px auto;
}

#quiz-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#question {
    margin-bottom: 10px;
}

#options-container {
    margin-bottom: 20px;
}

button {
    margin: 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

#timer {
    margin-top: 10px;
    font-size: 18px;
}

#result-container {
    text-align: center;
}

.indicator {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 2px;
}

.answered {
    background-color: green;
}

.unanswered {
    background-color: red;
}
