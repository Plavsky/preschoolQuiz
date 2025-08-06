let currentUser = null;
let currentRole = null;
let currentDifficulty = null;
let currentQuestionIndex = 0;
let score = 0;
let currentSubject = null;

let userScores = {};
let subjectScores = {
  color: 0,
  science: 0,
  math: 0
};
let subjectAnswered = {
  color: new Set(),
  science: new Set(),
  math: new Set()
};

const users = {};

const quizzes = {
  color: {
    veryEasy: [
      { question: "What color is the sky?", options: ["Blue", "Green", "Red"], answer: "Blue" },
      { question: "What color is grass?", options: ["Yellow", "Green", "Pink"], answer: "Green" },
      { question: "What color is a banana?", options: ["Purple", "Yellow", "Blue"], answer: "Yellow" }
    ],
    easy: [
      { question: "What color do you get by mixing red and white?", options: ["Pink", "Orange", "Purple"], answer: "Pink" },
      { question: "Which one is NOT a color?", options: ["Circle", "Blue", "Red"], answer: "Circle" },
      { question: "What color is an apple usually?", options: ["Red", "Gray", "Black"], answer: "Red" }
    ],
    medium: [
      { question: "What color do you get by mixing blue and yellow?", options: ["Green", "Orange", "Purple"], answer: "Green" },
      { question: "What color are strawberries?", options: ["Red", "Blue", "White"], answer: "Red" },
      { question: "What do we call colors like red, yellow, blue?", options: ["Primary", "Secondary", "Tertiary"], answer: "Primary" }
    ],
    hard: [
      { question: "What color do red and blue make?", options: ["Purple", "Green", "Pink"], answer: "Purple" },
      { question: "Which color symbolizes peace?", options: ["White", "Black", "Brown"], answer: "White" },
      { question: "Which color is made by mixing yellow and red?", options: ["Orange", "Green", "Purple"], answer: "Orange" }
    ],
    veryHard: [
      { question: "Which is a warm color?", options: ["Red", "Blue", "Green"], answer: "Red" },
      { question: "Which is a cool color?", options: ["Blue", "Orange", "Red"], answer: "Blue" },
      { question: "What color do you get by mixing all primary colors?", options: ["Brown", "Pink", "Gray"], answer: "Brown" }
    ],
    ultraHard: [
      { question: "What color absorbs all light?", options: ["Black", "White", "Yellow"], answer: "Black" },
      { question: "What color reflects all light?", options: ["White", "Black", "Blue"], answer: "White" },
      { question: "Which color is not in the rainbow?", options: ["Pink", "Indigo", "Violet"], answer: "Pink" }
    ]
  },

  science: {
    veryEasy: [
      { question: "What do we breathe in to live?", options: ["Oxygen", "Smoke", "Carbon"], answer: "Oxygen" },
      { question: "What shines during the day?", options: ["Sun", "Moon", "Stars"], answer: "Sun" },
      { question: "What do plants need to grow?", options: ["Water", "Stone", "Fire"], answer: "Water" }
    ],
    easy: [
      { question: "Which part of the body helps us see?", options: ["Eyes", "Hands", "Legs"], answer: "Eyes" },
      { question: "What do bees make?", options: ["Honey", "Milk", "Juice"], answer: "Honey" },
      { question: "Which of these is a living thing?", options: ["Dog", "Car", "Chair"], answer: "Dog" }
    ],
    medium: [
      { question: "Which sense do we use to hear?", options: ["Ears", "Eyes", "Nose"], answer: "Ears" },
      { question: "What do we call frozen water?", options: ["Ice", "Steam", "Cloud"], answer: "Ice" },
      { question: "What planet do we live on?", options: ["Earth", "Mars", "Venus"], answer: "Earth" }
    ],
    hard: [
      { question: "What gas do plants give off?", options: ["Oxygen", "Carbon", "Helium"], answer: "Oxygen" },
      { question: "What organ pumps blood?", options: ["Heart", "Lung", "Liver"], answer: "Heart" },
      { question: "What is the center of the solar system?", options: ["Sun", "Earth", "Moon"], answer: "Sun" }
    ],
    veryHard: [
      { question: "Which is a mammal?", options: ["Dolphin", "Shark", "Lizard"], answer: "Dolphin" },
      { question: "What is H2O?", options: ["Water", "Oxygen", "Salt"], answer: "Water" },
      { question: "Which part of the plant absorbs water?", options: ["Roots", "Leaves", "Stem"], answer: "Roots" }
    ],
    ultraHard: [
      { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter"], answer: "Mars" },
      { question: "What tool do we use to look at stars?", options: ["Telescope", "Microscope", "Compass"], answer: "Telescope" },
      { question: "Which of these is a gas?", options: ["Air", "Rock", "Water"], answer: "Air" }
    ]
  },

  math: {
    veryEasy: [
      { question: "What is 1 + 1?", options: ["2", "1", "3"], answer: "2" },
      { question: "What comes after 3?", options: ["4", "2", "5"], answer: "4" },
      { question: "What is 5 - 2?", options: ["3", "2", "4"], answer: "3" }
    ],
    easy: [
      { question: "What is 2 + 2?", options: ["4", "3", "5"], answer: "4" },
      { question: "What is 6 - 3?", options: ["3", "2", "4"], answer: "3" },
      { question: "What shape has 3 sides?", options: ["Triangle", "Square", "Circle"], answer: "Triangle" }
    ],
    medium: [
      { question: "What is 3 + 4?", options: ["7", "6", "8"], answer: "7" },
      { question: "What is 9 - 5?", options: ["4", "5", "6"], answer: "4" },
      { question: "What shape has 4 sides?", options: ["Square", "Triangle", "Circle"], answer: "Square" }
    ],
    hard: [
      { question: "What is 5 + 7?", options: ["12", "11", "13"], answer: "12" },
      { question: "What is 10 - 4?", options: ["6", "5", "7"], answer: "6" },
      { question: "Which is greater: 8 or 6?", options: ["8", "6", "Same"], answer: "8" }
    ],
    veryHard: [
      { question: "What is 15 - 9?", options: ["6", "5", "7"], answer: "6" },
      { question: "What is 6 + 6?", options: ["12", "11", "13"], answer: "12" },
      { question: "Which number is even?", options: ["4", "5", "7"], answer: "4" }
    ],
    ultraHard: [
      { question: "What is 9 + 8?", options: ["17", "16", "18"], answer: "17" },
      { question: "What is 20 - 7?", options: ["13", "14", "12"], answer: "13" },
      { question: "What number comes before 100?", options: ["99", "101", "98"], answer: "99" }
    ]
  }
};


function goToScreen(screenId, role = null) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  if (role) currentRole = role;
  updateDifficultyButtons();
}

function login() {
  const u = document.getElementById("login-username").value;
  const p = document.getElementById("login-password").value;
  if (users[u] && users[u].password === p) {
    currentUser = u;
    userScores[currentUser] = subjectScores;
    goToScreen(currentRole === 'student' ? 'student-menu' : 'teacher-menu');
  } else alert("Invalid login.");
}

function signup() {
  const u = document.getElementById("signup-username").value;
  const p = document.getElementById("signup-password").value;
  if (!users[u]) {
    users[u] = { password: p };
    alert("Signup successful!");
    goToScreen("login-screen");
  } else alert("Username exists.");
}

function selectSubject(subject) {
  currentSubject = subject;
  goToScreen("difficulty-selection");
  updateDifficultyButtons();
}

function startQuiz(difficulty) {
  if (subjectAnswered[currentSubject].has(difficulty)) return;
  currentDifficulty = difficulty;
  currentQuestionIndex = 0;
  score = 0;
  goToScreen("quiz-screen");
  showQuestion();
}

function showQuestion() {
  const q = quizzes[currentSubject][currentDifficulty][currentQuestionIndex];
  document.getElementById("quiz-question").textContent = q.question;
  const opts = document.getElementById("quiz-options");
  opts.innerHTML = "";
  q.options.forEach(o => {
    const b = document.createElement("button");
    b.textContent = o;
    b.onclick = () => checkAnswer(o);
    opts.appendChild(b);
  });
}


function checkAnswer(selected) {
  const currentQuestion = quizzes[currentSubject][currentDifficulty][currentQuestionIndex];
  if (selected === currentQuestion.answer) score++;
  currentQuestionIndex++;
  if (currentQuestionIndex < quizzes[currentSubject][currentDifficulty].length) {
    showQuestion();
  } else {
    endQuiz();
  }
}


function endQuiz() {
  subjectScores[currentSubject] += score;
  userScores[currentUser] = subjectScores;
  subjectAnswered[currentSubject].add(currentDifficulty);
  document.getElementById("score-text").textContent = `You scored ${score}/3!`;
  goToScreen("score-screen");
  updateDifficultyButtons();
}

function updateDifficultyButtons() {
  if (!currentSubject) return;
  const userScore = subjectScores[currentSubject];
  const answered = subjectAnswered[currentSubject];
  document.getElementById("total-score").textContent = `Total Score: ${userScore}`;
  const unlockReq = { hard:6, veryHard:9, ultraHard:12 };
  document.querySelectorAll(".difficulty-btn").forEach(btn => {
    const d = btn.dataset.difficulty;
    const locked = unlockReq[d] ? userScore < unlockReq[d] : false;
    const done = answered.has(d);
    btn.disabled = locked || done;
    btn.classList.toggle("locked", locked || done);
  });
}

function restartApp() {
  currentUser = null; currentRole = null;
  score = 0;
  subjectScores = { color: 0, science: 0, math: 0 };
  subjectAnswered = { color: new Set(), science: new Set(), math: new Set() };
  userScores = {};
  goToScreen('title-screen');
}

function restartProgress() {
  for (let s in subjectScores) {
    subjectScores[s] = 0;
    subjectAnswered[s].clear();
  }
  userScores[currentUser] = subjectScores;
  updateDifficultyButtons();
}
