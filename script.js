const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

let startBtn = document.getElementById("start-btn");
let startSection = document.getElementById("start");
let questionSection = document.getElementById("question-container");
let question = document.getElementById("question");
let optionSection = document.getElementById("options");
let answer = document.getElementById("answer");
let scoreElement = document.getElementById("score");
let finalResult = document.getElementById("final");
let timer = document.getElementById("time");
let showHighScores = document.getElementById("final-scores");
let highScoreElement = document.getElementById("high-score");
let leaderboard = document.getElementById("leaderboard");

startBtn.addEventListener("click", startGame);

leaderboard.addEventListener("click", highScores);

let i = 0;
let score = 0;
let time = 60;

function startGame() {
  startSection.classList.add("hide");
  questionSection.classList.remove("hide");
  setQuestion();
  var counter = setInterval(setTimer, 1000);
  function setTimer() {
    timer.innerText = "Time : " + time;
    time--;
    if (time < 0 || i == questions.length) {
      clearInterval(counter);
      questionSection.classList.add("hide");
      finalResult.classList.remove("hide");
      scoreElement.innerText = "Your final score " + score;
    }
  }
}

function setQuestion() {
  question.innerText = questions[i].questionText;

  questions[i].options.forEach((option) => {
    let button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = option;
    button.addEventListener("click", () => {
      setAnswer(option);
    });
    optionSection.appendChild(button);
  });
}

function setAnswer(option) {
  if (questions[i].answer == option) {
    answer.innerText = "Correct!";
    i++;
    score = score + 10;
    nextQuestion();
  } else {
    answer.innerText = "Incorrect!";
    time = time - 10;
    score = score - 5;
  }
}

function nextQuestion() {
  if (i < questions.length) {
    optionSection.innerHTML = "";
    setQuestion();
  } else {
    questionSection.classList.add("hide");
    finalResult.classList.remove("hide");
    scoreElement.innerText = "Your final score " + score;
  }
}

function saveScore() {
  let input = document.getElementById("input");
  let name = input.value;
  let newScore = { name, score };
  if (localStorage.getItem("scores") == null) {
    localStorage.setItem("scores", JSON.stringify([]));
  }

  let allScores = JSON.parse(localStorage.getItem("scores"));
  allScores.push(newScore);
  localStorage.setItem("scores", JSON.stringify(allScores));

  highScores();
}

function highScores() {
  finalResult.classList.add("hide");
  startSection.classList.add("hide");
  highScoreElement.classList.remove("hide");
  let scores = JSON.parse(localStorage.getItem("scores"));
  scores.sort((a, b) => b.score - a.score);
  let index = 1;
  scores.forEach((score) => {
    let dispScore = document.createElement("p");
    dispScore.innerText = index + ". " + score.name + " : " + score.score;
    showHighScores.appendChild(dispScore);
    index++;
  });
}

function home() {
  window.location.reload();
}
function resetScore() {
  localStorage.removeItem("scores");
  window.location.reload();
}
