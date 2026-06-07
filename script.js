// DOM ELEMENTS

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan =
  document.getElementById("current-question");

const totalQuestionsSpan =
  document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");

const finalScoreSpan =
  document.getElementById("final-score");

const maxScoreSpan =
  document.getElementById("max-score");

const resultMessage =
  document.getElementById("result-message");

const progressBar =
  document.getElementById("progress");

// QUESTIONS

const quizQuestions = [

  {
    question: "Which keyword is used to create a class in Java?",
    answers: [
      { text: "function", correct: false },
      { text: "class", correct: true },
      { text: "define", correct: false },
      { text: "struct", correct: false },
    ],
  },

  {
    question: "Which method is the entry point of a Java program?",
    answers: [
      { text: "start()", correct: false },
      { text: "run()", correct: false },
      { text: "main()", correct: true },
      { text: "execute()", correct: false },
    ],
  },

  {
    question: "Which data type is used to store whole numbers in Java?",
    answers: [
      { text: "float", correct: false },
      { text: "String", correct: false },
      { text: "int", correct: true },
      { text: "boolean", correct: false },
    ],
  },

  {
    question: "Which keyword is used to inherit a class in Java?",
    answers: [
      { text: "extends", correct: true },
      { text: "super", correct: false },
      { text: "implements", correct: false },
      { text: "inherits", correct: false },
    ],
  },

  {
    question: "Which loop executes at least once?",
    answers: [
      { text: "for", correct: false },
      { text: "while", correct: false },
      { text: "do-while", correct: true },
      { text: "foreach", correct: false },
    ],
  },

  {
    question: "Which keyword creates an object?",
    answers: [
      { text: "new", correct: true },
      { text: "object", correct: false },
      { text: "create", correct: false },
      { text: "init", correct: false },
    ],
  },

  {
    question: "Which collection stores unique values?",
    answers: [
      { text: "ArrayList", correct: false },
      { text: "HashSet", correct: true },
      { text: "LinkedList", correct: false },
      { text: "HashMap", correct: false },
    ],
  },

  {
    question: "Which exception occurs when dividing by zero?",
    answers: [
      { text: "IOException", correct: false },
      { text: "ArithmeticException", correct: true },
      { text: "NullPointerException", correct: false },
      { text: "ClassNotFoundException", correct: false },
    ],
  },

  {
    question: "Which concept allows many forms?",
    answers: [
      { text: "Polymorphism", correct: true },
      { text: "Abstraction", correct: false },
      { text: "Inheritance", correct: false },
      { text: "Encapsulation", correct: false },
    ],
  },

  {
    question: "Which operator compares values?",
    answers: [
      { text: "=", correct: false },
      { text: "==", correct: true },
      { text: "!=", correct: false },
      { text: "=>", correct: false },
    ],
  },

];

// STATE

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// TOTAL QUESTIONS

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// EVENTS

startButton.addEventListener("click", startQuiz);

restartButton.addEventListener("click", restartQuiz);

// START QUIZ

function startQuiz() {

  currentQuestionIndex = 0;

  score = 0;

  scoreSpan.textContent = 0;

  // shuffle questions

  quizQuestions.sort(() => Math.random() - 0.5);

  startScreen.classList.remove("active");

  resultScreen.classList.remove("active");

  quizScreen.classList.add("active");

  showQuestion();
}

// SHOW QUESTION

function showQuestion() {

  answersDisabled = false;

  const currentQuestion =
    quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent =
    currentQuestionIndex + 1;

  const progressPercent =
    ((currentQuestionIndex + 1) /
      quizQuestions.length) * 100;

  progressBar.style.width =
    progressPercent + "%";

  questionText.textContent =
    currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {

    const button =
      document.createElement("button");

    button.textContent = answer.text;

    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.setAttribute(
      "aria-label",
      answer.text
    );

    button.addEventListener(
      "click",
      selectAnswer
    );

    answersContainer.appendChild(button);
  });
}

// SELECT ANSWER

function selectAnswer(event) {

  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;

  const isCorrect =
    selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children)
    .forEach((button) => {

      button.disabled = true;

      if (button.dataset.correct === "true") {

        button.classList.add("correct");

      } else if (button === selectedButton) {

        button.classList.add("incorrect");
      }
    });

  if (isCorrect) {

    score++;

    scoreSpan.textContent = score;
  }

  setTimeout(() => {

    currentQuestionIndex++;

    if (
      currentQuestionIndex <
      quizQuestions.length
    ) {

      showQuestion();

    } else {

      showResults();
    }

  }, 1000);
}

// SHOW RESULTS

function showResults() {

  quizScreen.classList.remove("active");

  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage =
    (score / quizQuestions.length) * 100;

  if (percentage === 100) {

    resultMessage.textContent =
      "🏆 Perfect Score! Amazing!";

  } else if (percentage >= 80) {

    resultMessage.textContent =
      "🔥 Excellent work!";

  } else if (percentage >= 60) {

    resultMessage.textContent =
      "👍 Good job!";

  } else if (percentage >= 40) {

    resultMessage.textContent =
      "🙂 Nice try!";

  } else {

    resultMessage.textContent =
      "📚 Keep practicing!";
  }
}

// RESTART

function restartQuiz() {

  resultScreen.classList.remove("active");

  startQuiz();
}