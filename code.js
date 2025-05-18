const cards = document.querySelectorAll('.card');
const buttons = document.querySelectorAll('.buttons button');
const selectBtn = document.getElementById("select-btn");

let current = 0;
let selectedGame = "rpc.html"; // Default selection

// Function to update slider
function updateSlider(index) {
  cards.forEach(card => card.classList.remove('current'));
  cards[index].classList.add('current');

  // Update selection based on the highlighted card
  selectedGame = cards[index].id === "friends" ? "log-check.html" : "rpc.html";
}

// Arrow button functionality
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("btn-next")) {
      current = (current + 1) % cards.length;
    } else {
      current = (current - 1 + cards.length) % cards.length;
    }
    updateSlider(current);
  });
});

// Select button functionality
selectBtn.addEventListener("click", () => {
  window.location.href = selectedGame;
});
