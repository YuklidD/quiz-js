document.addEventListener('DOMContentLoaded', () => {
        const quizQuestions = [
        {
            question: "Which method is used to create a new array with all elements that pass the test implemented by the provided function in JavaScript?",
            choices: [".map()", ".filter()", ".reduce()", ".forEach()"],
            correct: ".filter()"
        },
        {
            question: "What does the 'display: flex;' CSS property do?",
            choices: ["Changes the display to a block-level element", "Arranges elements horizontally or vertically within a container", "Displays an element as an inline element", "None of the above"],
            correct: "Arranges elements horizontally or vertically within a container"
        },
        {
            question: "Which HTML element is used for specifying a JavaScript file?",
            choices: ["<js>", "<scripting>", "<javascript>", "<script>"],
            correct: "<script>"
        },
        {
            question: "How do you declare a JavaScript variable?",
            choices: ["var carName;", "v carName;", "variable carName;", "None of the above"],
            correct: "var carName;"
        },
        {
            question: "Which property is used to change the text color of an element?",
            choices: ["fontcolor", "text-color", "color", "None of the above"],
            correct: "color"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswers = new Array(quizQuestions.length).fill(null);

    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const navigationContainer = document.createElement('div');
    document.getElementById('quiz-container').appendChild(navigationContainer);

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('btn', 'btn-secondary', 'mt-3', 'mr-2');
    backButton.addEventListener('click', goBack);
    backButton.style.display = 'none'; 

    const nextButton = document.createElement('button');
    nextButton.classList.add('btn', 'btn-primary', 'mt-3');
    nextButton.addEventListener('click', handleNextButtonClick);

    navigationContainer.appendChild(backButton);
    navigationContainer.appendChild(nextButton);

    function updateNextButtonText() {
        if (currentQuestionIndex === quizQuestions.length - 1) {
            nextButton.textContent = 'Submit All';
        } else {
            nextButton.textContent = 'Next Question';
        }
    }

    function displayQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        choicesElement.innerHTML = ''; 
        feedbackElement.textContent = '';

        currentQuestion.choices.forEach((choice, index) => {
            const choiceButton = document.createElement('button');
            choiceButton.textContent = choice;
            choiceButton.classList.add('btn', 'btn-outline-info', 'my-2');
            choiceButton.addEventListener('click', () => selectAnswer(index));
            choicesElement.appendChild(choiceButton);

            if (selectedAnswers[currentQuestionIndex] === index) {
                choiceButton.classList.add('btn-info');
                choiceButton.classList.remove('btn-outline-info');
            }
        });

        backButton.style.display = currentQuestionIndex > 0 ? '' : 'none';
        updateNextButtonText();
    }

    function selectAnswer(index) {
        selectedAnswers[currentQuestionIndex] = index;
        displayQuestion(); 
    }

    function handleNextButtonClick() {
        if (selectedAnswers[currentQuestionIndex] === null) {
            feedbackElement.textContent = 'Please select an answer.';
            feedbackElement.className = 'text-danger';
            return;
        }

        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            submitQuiz();
        }
    }

    function goBack() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    }

    function submitQuiz() {
        score = selectedAnswers.reduce((acc, answerIdx, idx) => acc + (quizQuestions[idx].choices[answerIdx] === quizQuestions[idx].correct ? 1 : 0), 0);
        displayScore();
    }

    function displayScore() {
        questionElement.textContent = "Quiz Complete!";
        choicesElement.innerHTML = ''; 
        navigationContainer.innerHTML = ''; 
    
        // Show detailed results
        const resultContainer = document.createElement('div');
        quizQuestions.forEach((question, index) => {
            const questionFeedback = document.createElement('p');
            const userAnswer = question.choices[selectedAnswers[index]];
            const isCorrect = userAnswer === question.correct;
            
            questionFeedback.innerHTML = `
                <strong>Q${index + 1}: ${question.question}</strong><br>
                Your answer: ${userAnswer || "No answer"}<br>
                ${isCorrect ? '<span style="color: green;">Correct!</span>' : `<span style="color: red;">Incorrect!</span> Correct answer: ${question.correct}`}
            `;
            resultContainer.appendChild(questionFeedback);
        });
    
        
        document.getElementById('quiz-container').appendChild(resultContainer);
    
        // Update feedback and score display
        feedbackElement.textContent = '';
        scoreElement.textContent = `Your score: ${score} out of ${quizQuestions.length}.`;
    
        // Celebration message if all answers are correct
        if (score === quizQuestions.length) {
            const celebrationMessage = document.createElement('div');
            celebrationMessage.innerHTML = `<div class="full-window-celebration">Congratulations! 🎉<br>You got all the answers correct!</div>`;
            document.body.appendChild(celebrationMessage);
            document.body.classList.add('celebrate-animation');
        }
    }
    

    displayQuestion();
});
