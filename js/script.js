console.log("script.js connected!");

const questionBlocks = document.querySelectorAll(".question-block");
const userAnswers = {};

questionBlocks.forEach(function(block) {
  const buttons = block.querySelectorAll(".answer-btn");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      buttons.forEach(function(otherButton) {
        otherButton.classList.remove("selected");
        otherButton.setAttribute("aria-pressed", "false");
      });

      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");
      userAnswers[block.dataset.question] = button.dataset.answer;
      document.getElementById("result-container").style.display = "none";
    });
  });
});

function displayResult() {
  const resultContainer = document.getElementById("result-container");
  const resultTitle = document.getElementById("result-title");
  const resultText = document.getElementById("result-text");

  if (Object.keys(userAnswers).length !== questionBlocks.length) {
    resultTitle.textContent = "Finish the quiz";
    resultText.textContent = "Choose one answer for each question before showing your result.";
    resultContainer.style.display = "block";
    return;
  }

  const scores = {
    survival: 0,
    shooter: 0,
    story: 0,
    "open-world": 0
  };

  Object.values(userAnswers).forEach(function(answer) {
    scores[answer] += 1;
  });

  const highestScore = Math.max(...Object.values(scores));
  let winningAnswer = "";

  // If categories tie, an answer from a later question breaks the tie.
  questionBlocks.forEach(function(block) {
    const answer = userAnswers[block.dataset.question];
    if (scores[answer] === highestScore) {
      winningAnswer = answer;
    }
  });

  const results = {
    survival: {
      name: "Survival",
      description: "You like planning ahead, making the most of what you have, and overcoming tough situations."
    },
    shooter: {
      name: "Shooter",
      description: "You enjoy quick decisions, action, and the excitement of getting better with every match."
    },
    story: {
      name: "Story Mode",
      description: "You play for memorable characters, meaningful choices, and a story that stays with you."
    },
    "open-world": {
      name: "Open World",
      description: "You love the freedom to explore, discover hidden places, and decide where to go next."
    }
  };

  resultTitle.textContent = "You are " + results[winningAnswer].name + "!";
  resultText.textContent = results[winningAnswer].description;
  resultContainer.style.display = "block";
}

document.getElementById("show-result").addEventListener("click", displayResult);
