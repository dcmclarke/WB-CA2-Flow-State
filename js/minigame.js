const grid = document.querySelector('.grid');
const tipBox = document.getElementById('tip');
const startBtn = document.getElementById('startBtn');
const rewardBox = document.getElementById('reward');
const guessesBox = document.getElementById('guesses');
const playAgainBtn = document.getElementById('play-again');

let boxes = [];
let catIndex = null;
let gameActive = false;
let guessesLeft = 3;

const csTips = [
  "Break down a large coding problem into functions or modules. Start by writing pseudocode for each step.",
  "Set up a daily coding routine with a specific goal, like solving one algorithm problem or building a small feature.",
  "Learn to use browser developer tools (e.g., Chrome DevTools) to debug JavaScript and inspect HTML/CSS.",
  "Master Git commands like `git rebase`, `git stash`, and `git cherry-pick` to handle advanced version control scenarios.",
  "Use online resources like MDN Web Docs or official documentation to understand APIs and language features deeply.",
  "Practice analyzing the time complexity of your code by identifying loops, recursion, and nested operations.",
  "Understand how closures, promises, and async/await work in JavaScript to write cleaner asynchronous code.",
  "Experiment with a new JavaScript framework (e.g., React, Vue, or Svelte) by building a small project like a to-do app.",
  "Contribute to an open-source project on GitHub to gain real-world experience and collaborate with other developers.",
  "Use debugging tools like breakpoints in VS Code or `console.table()` to inspect arrays and objects effectively.",
  "Learn how to write unit tests using frameworks like Jest or Mocha to ensure your code works as expected.",
  "Understand how REST APIs work by building a simple backend with Node.js and Express.",
  "Explore CSS Grid and Flexbox by recreating layouts from popular websites to improve your frontend skills.",
  "Use tools like Postman or Insomnia to test APIs and understand how HTTP methods (GET, POST, PUT, DELETE) work.",
  "Learn how to optimize your code by identifying bottlenecks using performance profiling tools in your browser or IDE.",
  "Understand the difference between `let`, `const`, and `var` in JavaScript and use them appropriately.",
  "Practice writing clean, readable code by following a style guide like Airbnb's JavaScript Style Guide.",
  "Learn how to deploy a simple web app using platforms like Netlify, Vercel, or GitHub Pages.",
  "Understand how to use environment variables to securely store sensitive information like API keys.",
  "Build a portfolio website to showcase your projects and skills to potential employers or clients."
];

function createBoxes() {
  grid.innerHTML = '';
  boxes = [];

  for (let i = 0; i < 9; i++) {
    const box = document.createElement('div');
    box.classList.add('box');

    // Set initial grid position
    const row = Math.floor(i / 3);
    const col = i % 3;
    box.style.left = `${col * 120}px`;
    box.style.top = `${row * 120}px`;

    grid.appendChild(box);
    boxes.push(box);
  }
}

function assignCat() {
  catIndex = Math.floor(Math.random() * boxes.length);
}

function showCatBriefly() {
  boxes[catIndex].classList.add('open');
  tipBox.textContent = "Watch closely!";
  tipBox.style.display = 'block';

  setTimeout(() => {
    boxes[catIndex].classList.remove('open');
    shuffleBoxes();
  }, 1500);
}

function shuffleBoxes(times = 5, interval = 500) {
  let count = 0;
  const positions = [];

  // Create 3x3 grid positions
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      positions.push({ left: col * 120, top: row * 120 });
    }
  }

  const shuffleInterval = setInterval(() => {
    // Shuffle position array
    const shuffled = positions.slice().sort(() => Math.random() - 0.5);

    boxes.forEach((box, i) => {
      box.style.left = `${shuffled[i].left}px`;
      box.style.top = `${shuffled[i].top}px`;
    });

    count++;
    if (count >= times) {
      clearInterval(shuffleInterval);
      tipBox.textContent = "Where's the cat?";
      gameActive = true;
      addClickListeners();
    }
  }, interval);
}

function addClickListeners() {
  boxes.forEach((box, index) => {
    box.onclick = () => {
      if (!gameActive) return;

      guessesLeft--;
      guessesBox.textContent = `Guesses Left: ${guessesLeft}`;
      box.style.pointerEvents = 'none'; // Disable further clicks on this box

      if (index === catIndex) {
        box.classList.add('revealed');
        tipBox.textContent = "You found the cat!";
        showReward();
        gameActive = false;
        playAgainBtn.style.display = 'block';
        boxes.forEach(b => b.style.pointerEvents = 'none'); // Disable all boxes
      } else {
        if (guessesLeft === 0) {
          boxes[catIndex].classList.add('revealed');
          tipBox.textContent = "Out of guesses! The cat was there!";
          gameActive = false;
          playAgainBtn.style.display = 'block';
          boxes.forEach(b => b.style.pointerEvents = 'none'); // Disable all boxes
        } else {
          tipBox.textContent = "Try again!";
        }
      }
    };
  });
}

// Initialize the game
function showReward() {
  const randomTip = csTips[Math.floor(Math.random() * csTips.length)];
  rewardBox.textContent = randomTip;
  rewardBox.style.display = 'block';
}

function resetGame() {
  gameActive = false;
  guessesLeft = 3;
  guessesBox.textContent = `Guesses Left: ${guessesLeft}`;
  tipBox.style.display = 'none';
  rewardBox.style.display = 'none';
  playAgainBtn.style.display = 'none';
  createBoxes();
  assignCat();
  showCatBriefly();
}

startBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);