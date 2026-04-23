
import { saveScore, loadRanking } from './firebase.js';

const words = [
  "apple", "banana", "orange", "grape", "melon",
  "strawberry", "typing", "battle", "keyboard", "speed"
];

let score = 0;
let time = 30;
let currentWord = "";
let timer;

const wordEl = document.getElementById("word");
const inputEl = document.getElementById("input");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const rankingEl = document.getElementById("ranking");

window.startGame = function() {
  score = 0;
  time = 30;
  scoreEl.textContent = score;
  timeEl.textContent = time;
  inputEl.value = "";
  inputEl.disabled = false;

  nextWord();

  clearInterval(timer);
  timer = setInterval(async () => {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
      clearInterval(timer);
      inputEl.disabled = true;
      await saveScore(score);
      await showRanking();
      alert(`ゲーム終了！スコア: ${score}`);
    }
  }, 1000);
};

function nextWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordEl.textContent = currentWord;
}

inputEl.addEventListener("input", () => {
  if (inputEl.value === currentWord) {
    score++;
    scoreEl.textContent = score;
    inputEl.value = "";
    nextWord();
  }
});

async function showRanking() {
  const ranking = await loadRanking();
  rankingEl.innerHTML = "";
  ranking.forEach(score => {
    const li = document.createElement("li");
    li.textContent = score;
    rankingEl.appendChild(li);
  });
}

showRanking();
