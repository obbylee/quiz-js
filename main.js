const startBtn = document.querySelector('#start-btn');
const nextBtn = document.querySelector('#next-btn');
const questionContainer = document.querySelector('#question-container');
const question = document.querySelector('#question');
const answerBtn = document.querySelector('#answer-btn');

let shuffleQ, currentQ;

const questionsData = [
    {
        question: 'What is 2 + 2',
        answer: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
    },
    {
        question: 'What is 1000 * 2',
        answer: [
            {text: '7', correct: false},
            {text: '9', correct: false},
            {text: '2000', correct: true},
            {text: '10', correct: false}
        ]
    },
    {
        question: 'Would you like vanilla ice cream?',
        answer: [
            {text: 'YES!!!', correct: true},
            {text: 'NO', correct: false}
        ]
    },
    {
        question: 'What is your best quality?',
        answer: [
            {text: 'Gaming', correct: true},
            {text: 'Coding', correct: false},
            {text: 'Everything', correct: false}
        ]
    }
];

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
    currentQ++;
    nextQuestion();
});

function startGame() {
    console.log('Started');
    startBtn.classList.add('hide');
    questionContainer.classList.remove('hide');

    shuffleQ = questionsData.sort(() => Math.random() - .5);
    currentQ = 0;

    nextQuestion();
}

function nextQuestion() {
    resetState();
    showQuestion(shuffleQ[currentQ]);
}

function showQuestion(questionsData) {
    // console.log(questionsData.answer.text[0]);
    question.innerText = questionsData.question;
    questionsData.answer.forEach(answerText => {
        const button = document.createElement('button');
        button.innerText = answerText.text;
        button.classList.add('btn');
        if (answerText.correct) {
            button.dataset.correct = answerText.correct;
        }
        button.addEventListener('click', pickAnswer);
        answerBtn.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextBtn.classList.add('hide');
    // console.log(answerBtn.firstChild);
    while(answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function pickAnswer(e) {
    const selectButton = e.target;
    const correct = selectButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerBtn.children).forEach(btn => {
        setStatusClass(btn, btn.dataset.correct);
    });
    if (shuffleQ.length > currentQ + 1) {
        nextBtn.classList.remove('hide');
    } else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hide');
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}