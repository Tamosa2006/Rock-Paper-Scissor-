const choices = document.querySelectorAll(".choice");
const userScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const tieScoreEl = document.getElementById("tie-score");
const userChoiceImgEl = document.getElementById("user-choice-img");
const computerChoiceImgEl = document.getElementById("computer-choice-img");
const resultEl = document.getElementById("result");
const exitButton = document.getElementById("exit-btn");

let userScore = 0;
let computerScore = 0;
let tieScore = 0;

// Function to get a random computer choice
function getComputerChoice() {
    const options = ["rock", "paper", "scissor"];
    return options[Math.floor(Math.random() * options.length)];
}

// Function to determine the winner and update scores
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        tieScore++;
        return "It's a tie!";
    } else if (
        (userChoice === "rock" && computerChoice === "scissor") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissor" && computerChoice === "paper")
    ) {
        userScore++;
        return `You win! Your ${userChoice} beats ${computerChoice}`;
    } else {
        computerScore++;
        return `You lost! ${computerChoice} beats your ${userChoice}`;
    }
}

// Function to play the game continuously
function playGame(userChoiceElement) {
    const userChoice = userChoiceElement.id;
    const computerChoice = getComputerChoice();

    // Update images based on choices
    userChoiceImgEl.src = `./pictures/${userChoice}.png`;
    computerChoiceImgEl.src = `./pictures/${computerChoice}.png`;

    // Apply shake effect
    userChoiceElement.classList.add("shake");

    setTimeout(() => {
        userChoiceElement.classList.remove("shake");

        // Determine winner & update scores
        const resultText = determineWinner(userChoice, computerChoice);
        resultEl.textContent = `Result: ${resultText}`;

        // Apply color based on outcome
        resultEl.style.color = resultText.includes("You win") ? "green" :
                              resultText.includes("You lost") ? "red" : "white";

        // Update scoreboard continuously
        userScoreEl.textContent = userScore;
        computerScoreEl.textContent = computerScore;
        tieScoreEl.textContent = tieScore;

    }, 500);
}

// Attach event listeners to choices for infinite gameplay
choices.forEach(choice => {
    choice.addEventListener("click", () => playGame(choice));
});

// Exit button functionality
document.addEventListener("DOMContentLoaded", () => {
    const exitButton = document.getElementById("exit-btn"); // Selecting the exit button
    const finalResultEl = document.getElementById("final-result-text");
    const okBtn = document.getElementById("ok-btn");

    let userScore = parseInt(localStorage.getItem("userScore")) || 0;
    let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

    exitButton.addEventListener("click", () => {
        let finalResult;

        if (userScore > computerScore) {
            finalResult = "🎉 You WIN the match!";
        } else if (computerScore > userScore) {
            finalResult = "😔 You LOST the match!";
        } else {
            finalResult = "🤝 It's a TIE!";
        }

        // Store final result in localStorage for `result.html`
        localStorage.setItem("finalResult", finalResult);

        // Redirect to result.html
        window.location.href = "score.html";
    });
});
